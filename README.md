# Quackatime

![Screenshot](https://files.catbox.moe/02c2v9.png)

Quackatime is an open-source, self-hostable time tracking server compatible with [WakaTime.](https://waka.hackclub.com) If you want to figure out how long you're spending on code to e.g. bill for consulting hours (or simply because you're curious about the stats!), setup Quackatime in _two minutes_ and get started!

## Running the installer

Sign in to Quackatime, then go to the [setup page](https://quack.skyfall.dev) and copy and paste the relevant command for your platform.

The installer's code is [here](https://github.com/quackatime/extension-installer), and supports VSCode, VSCode forks like Cursor and Windsurf, and most JetBrains IDEs.

## Development

Set the following `.env` variables:

```ts
{
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    RESEND_API_KEY: z.string().startsWith("re_"),
    RESEND_FROM_EMAIL: z.string().email(),
    RESEND_POSTAL_ADDRESS: z.string().optional(),
    SENTRY_ORG: z.string(),
    SENTRY_PROJECT: z.string(),
    SENTRY_AUTH_TOKEN: z.string(),
    FRONTEND_DOMAIN: z.string().url(),
    VITE_BETTER_AUTH_URL: z.string().url(),
    VITE_GITHUB_CLIENT_ID: z.string(),
    VITE_SENTRY_DSN: z.string(),
}
```

Then, run:

```
bun install
bun dev
```

---

#### License

<sup>
Licensed under the <a href="LICENSE">GNU Affero General Public License v3.0</a>.
</sup>

<br>

<sub>
Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in this application by you, as defined in the GNU Affero General Public License v3.0, shall
be licensed as above, without any additional terms or conditions.
</sub>
