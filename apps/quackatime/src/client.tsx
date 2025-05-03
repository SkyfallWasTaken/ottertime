import { StartClient } from "@tanstack/react-start";
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";

import * as Sentry from "@sentry/tanstackstart-react";

const router = createRouter();

if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [
            Sentry.tanstackRouterBrowserTracingIntegration(router),
            Sentry.replayIntegration(),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for tracing.
        tracesSampleRate: 1.0,
        // Capture Replay for 10% of all sessions,
        // plus for 100% of sessions with an error.
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        sendDefaultPii: true,
    });
} else {
    console.error("No Sentry.")
}

hydrateRoot(document, <StartClient router={router} />);
