import { getRouterManifest } from "@tanstack/react-start/router-manifest";
/// <reference types="vinxi/types/server" />
import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/react-start/server";
import * as Sentry from "@sentry/tanstackstart-react";

import { createRouter } from "./router";
import { env } from "@repo/env/server";

Sentry.init({
	dsn: env.VITE_SENTRY_DSN,
	tracesSampleRate: 1.0,
	sendDefaultPii: true,
});

export default createStartHandler({
	createRouter,
	getRouterManifest,
})(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler));
