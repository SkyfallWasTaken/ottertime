import {
  registerGlobalMiddleware,
  createMiddleware,
} from "@tanstack/react-start";
import * as Sentry from "@sentry/tanstackstart-react";

registerGlobalMiddleware({
  middleware: [
    createMiddleware().server(Sentry.sentryGlobalServerMiddlewareHandler()),
  ],
});
