# Quackatime

![Screenshot](https://files.catbox.moe/02c2v9.png)

Quackatime is an open-source, self-hostable time tracking server compatible with [WakaTime.](https://waka.hackclub.com) If you want to figure out how long you're spending on code to e.g. bill for consulting hours (or simply because you're curious about the stats!), setup Quackatime in _two minutes_ and get started!

## Running the installer

Sign in to Quackatime, then go to the [setup page](https://quack.skyfall.dev) and copy and paste the relevant command for your platform.

The installer's code is [here](https://github.com/quackatime/extension-installer), and supports VSCode, VSCode forks like Cursor and Windsurf, and most JetBrains IDEs.

## Development

Set the following `.env` variables:

```
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
BUN_VERSION=1.2.10
DATABASE_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
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
