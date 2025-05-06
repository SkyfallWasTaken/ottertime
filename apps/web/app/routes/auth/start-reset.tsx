import { Loader2 } from "lucide-react";
import { type Ref, useRef, useState } from "react";
import { redirect } from "react-router";
import { toast } from "sonner";
import { Turnstile, type TurnstileRefFields } from "~/components/turnstile";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { getAuthData } from "~/middleware/auth-data";
import { authClient } from "~/utils/auth-client";
import type { Route } from "./+types/start-reset";

export async function loader({ context }: Route.LoaderArgs) {
	const authData = await getAuthData(context);
	if (authData) {
		throw redirect("/");
	}
	return null;
}

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [turnstileToken, setTurnstileToken] = useState("");
	const [loading, setLoading] = useState(false);
	const turnstileRef: Ref<TurnstileRefFields | null> = useRef(null);

	const isFormValid = () =>
		email.trim() && email.includes("@") && turnstileToken;

	return (
		<Card className="z-50 rounded-xl max-w-sm mx-auto gap-4">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your email to reset your password
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Input
						id="email"
						type="email"
						className="sentry-mask"
						placeholder="max@example.com"
						required
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
						aria-label="Email"
					/>
					<Turnstile
						ref={turnstileRef}
						onSuccess={(token) => {
							setTurnstileToken(token);
						}}
					/>
					<Button
						type="submit"
						className="w-full"
						disabled={loading || !isFormValid()}
						onClick={async () => {
							await authClient.forgetPassword({
								email,
								redirectTo: "/auth/finish-reset",
								fetchOptions: {
									headers: {
										"x-captcha-response": turnstileToken,
									},
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
										turnstileRef.current?.reset();
									},
									onSuccess: async () => {
										toast.success("Sent! Check your email for the reset link.");
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
