import { Loader2 } from "lucide-react";
import { useState } from "react";
import { redirect, useNavigate } from "react-router";
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
import { authClient } from "~/utils/auth-client";
import type { Route } from "./+types/finish-reset";

export async function loader({ request }: Route.LoaderArgs) {
	const token = new URLSearchParams(new URL(request.url).search).get("token");
	if (!token) {
		throw redirect("/auth/signin");
	}
	return {
		token,
	};
}

export default function SignIn({ loaderData }: Route.ComponentProps) {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { token } = loaderData;

	const isFormValid = () => password === confirmPassword;

	return (
		<Card className="z-50 rounded-xl max-w-sm mx-auto">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your new password to sign in to OtterTime
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Input
						id="password"
						type="password"
						className="sentry-mask"
						placeholder="Password"
						required
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						value={password}
						aria-label="Confirm Password"
					/>
					<Input
						id="password"
						type="password"
						className="sentry-mask mb-2"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						autoComplete="new-password"
						placeholder="Confirm Password"
						aria-label="Confirm Password"
					/>
					<Button
						type="submit"
						className="w-full"
						disabled={loading || !isFormValid()}
						onClick={async () => {
							await authClient.resetPassword({
								newPassword: password,
								token,
								fetchOptions: {
									onResponse: () => {
										setLoading(false);
									},
									onRequest: () => {
										setLoading(true);
									},
									onError: (ctx) => {
										toast.error(
											ctx.error.message === "invalid token"
												? "Invalid reset URL. Please request another one on the signin page."
												: ctx.error.message ||
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
							"Reset password"
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
