import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { getAuthData } from "~/middleware/auth-data";
import { authClient } from "~/utils/auth-client";
import type { Route } from "../auth/+types/signin";

export async function loader({ context }: Route.LoaderArgs) {
	const authData = await getAuthData(context);
	if (authData?.user.emailVerified) {
		// also checks if user is signed in!
		throw redirect("/");
	}
	if (authData?.user) {
		throw redirect("/auth/verify");
	}
	return null;
}

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const isFormValid = () => email.trim() && email.includes("@") && password;

	return (
		<Card className="z-50 rounded-xl max-w-sm mx-auto">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your information to access OtterTime
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Input
						id="email"
						type="email"
						placeholder="max@example.com"
						required
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
						aria-label="Email"
					/>
					<Input
						id="password"
						type="password"
						className="sentry-mask mb-2"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="new-password"
						placeholder="Password"
						aria-label="Password"
					/>
					<Button
						type="submit"
						className="w-full"
						disabled={loading || !isFormValid()}
						onClick={async () => {
							await authClient.signIn.email({
								email,
								password,
								callbackURL: "/",
								fetchOptions: {
									onResponse: () => {
										setLoading(false);
									},
									onRequest: () => {
										setLoading(true);
									},
									onError: (ctx) => {
										toast.error(
											ctx.error.message ||
												"An unknown error occurred. Please try again!",
										);
									},
									onSuccess: async () => {
										navigate("/");
									},
								},
							});
						}}
					>
						{loading ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							"Sign in"
						)}
					</Button>
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex justify-center w-full border-t py-4">
					<Link
						to="/auth/signup"
						className="text-center text-sm text-foreground/80 underline"
					>
						Need to make an account?
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
