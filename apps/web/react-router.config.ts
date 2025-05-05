import type { Config } from "@react-router/dev/config";
import "react-router";

declare module "react-router" {
	interface Future {
		unstable_middleware: true; // Enable middleware types
	}
}

export default {
	future: {
		unstable_middleware: true,
	},
	ssr: true,
} satisfies Config;
