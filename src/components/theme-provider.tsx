import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { type ReactNode, useEffect, useState } from "react";

export const themeAtom = atomWithStorage<"light" | "dark">("theme", "dark");

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme] = useAtom(themeAtom);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		setHasMounted(true);
	}, [theme]);

	return hasMounted ? children : null;
}
