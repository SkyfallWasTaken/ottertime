import {
	type TurnstileInstance,
	Turnstile as TurnstileWidget,
} from "@marsidev/react-turnstile";
import { env } from "@repo/env/client";
import { type Ref, useRef } from "react";
import { useTheme } from "remix-themes";

export default function Turnstile({
	onSuccess,
}: { onSuccess: (token: string) => void }) {
	const [theme] = useTheme();
	const ref: Ref<TurnstileInstance | null> = useRef(null);
	return (
		<div className="border-r border-[#797979] border-[1px]">
			<TurnstileWidget
				siteKey={env.VITE_TURNSTILE_SITE_KEY}
				ref={ref}
				options={{
					theme: theme || "auto",
					size: "flexible",
				}}
				onError={() => ref.current?.reset()}
				onSuccess={(token) => {
					onSuccess(token);
				}}
			/>
		</div>
	);
}
