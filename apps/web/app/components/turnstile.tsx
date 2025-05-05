import { Turnstile as TurnstileWidget } from "@marsidev/react-turnstile";
import { useTheme } from "remix-themes";
import { env } from "@repo/env/client";

export default function Turnstile({
	onSuccess,
}: { onSuccess: (token: string) => void }) {
	const [theme] = useTheme();
	return (
		<div className="border-r border-[#797979] border-[1px]">
			<TurnstileWidget
				siteKey={env.VITE_TURNSTILE_SITE_KEY}
				options={{
					theme: theme || "auto",
					size: "flexible",
				}}
				onSuccess={(token) => {
					onSuccess(token);
				}}
			/>
		</div>
	);
}
