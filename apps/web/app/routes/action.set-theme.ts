import { isTheme } from "remix-themes";
import { themeSessionResolver } from "../sessions.server";

export async function action({ request }: { request: Request }) {
	const session = await themeSessionResolver(request);
	const { theme } = await request.json();

	if (!isTheme(theme))
		return new Response(
			JSON.stringify({
				success: false,
				message: `theme value of ${theme} is not a valid theme.`,
			}),
			{ status: 400 },
		);

	session.setTheme(theme);
	return new Response(
		JSON.stringify({
			success: true,
		}),
		{ headers: { "Set-Cookie": await session.commit() } },
	);
}
