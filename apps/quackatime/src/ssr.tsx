import { getRouterManifest } from "@tanstack/react-start/router-manifest";
/// <reference types="vinxi/types/server" />
import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/react-start/server";
import * as Sentry from "@sentry/tanstackstart-react";

import { createRouter } from "./router";
import { env } from "~/utils/env"

if (env.PUBLIC_SENTRY_DSN) {
	Sentry.init({
		dsn: env.PUBLIC_SENTRY_DSN,
		tracesSampleRate: 1.0,
		sendDefaultPii: true,
	});
}

export default createStartHandler({
	createRouter,
	getRouterManifest,
})(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler));
