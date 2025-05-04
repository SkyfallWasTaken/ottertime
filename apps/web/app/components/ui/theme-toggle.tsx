import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { Theme, useTheme } from "remix-themes";

export function ThemeToggle() {
	const [theme, setTheme] = useTheme();

	const toggleTheme = () => {
		const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
		setTheme(newTheme);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === Theme.LIGHT ? "dark" : "light"} theme`}
		>
			{theme === Theme.LIGHT ? (
				<Moon className="h-5 w-5" />
			) : (
				<Sun className="h-5 w-5" />
			)}
		</Button>
	);
}
