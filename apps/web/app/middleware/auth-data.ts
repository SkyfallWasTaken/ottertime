import type {
  unstable_MiddlewareFunction,
  unstable_RouterContextProvider,
} from "react-router";
import { unstable_createContext } from "react-router";
import { auth } from "~/server/auth";

type AuthData = Awaited<ReturnType<typeof auth.api.getSession>>;
const authDataContext = unstable_createContext<AuthData>();

export const authDataMiddleware: unstable_MiddlewareFunction<Response> = async (
  { request, context },
  next
) => {
  const data = await auth.api.getSession({ headers: request.headers });
  context.set(authDataContext, data);
  await next();
};

export function getAuthData(context: unstable_RouterContextProvider) {
  return context.get(authDataContext);
}
