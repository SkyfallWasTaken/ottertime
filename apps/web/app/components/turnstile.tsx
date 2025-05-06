import {
	type TurnstileInstance,
	Turnstile as TurnstileWidget,
} from "@marsidev/react-turnstile";
import { env } from "@repo/env/client";
import { type Ref, useImperativeHandle, useRef } from "react";
import { useTheme } from "remix-themes";

export interface TurnstileRefFields {
	reset: () => void;
}

export function Turnstile({
	onSuccess,
	ref,
}: { onSuccess: (token: string) => void; ref: Ref<TurnstileRefFields> }) {
	const [theme] = useTheme();
	const tsRef: Ref<TurnstileInstance | null> = useRef(null);

	useImperativeHandle(
		ref,
		() => {
			return {
				reset: () => tsRef.current?.reset(),
			};
		},
		[],
	);

	return (
		<div className="border-r border-[#797979] border-[1px]">
			<TurnstileWidget
				siteKey={env.VITE_TURNSTILE_SITE_KEY}
				ref={tsRef}
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
