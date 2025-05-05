import { CheckIcon, ClipboardCopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types/setup"

export async function loader({ request }: Route.LoaderArgs) {
    const userAgent = request.headers.get("user-agent");
    const os = userAgent?.includes("Windows")
        ? "windows"
        : "unix"
    const origin = new URL(request.url).origin
    return {
        apiKey: "REPLACE_ME", // FIXME: hardcoded
        os,
        origin,
    };
}

export default function Setup({ loaderData }: Route.ComponentProps) {
    const { apiKey, os, origin } = loaderData;
    const apiUrl = `${origin}/api/v1`;
    const unixCommand = `curl -fsSL ${origin}/install-unix.sh | QUACKATIME_API_KEY="${apiKey}" QUACKATIME_API_URL="${apiUrl}" bash`;
    const windowsCommand = `$env:QUACKATIME_API_KEY="${apiKey}"; $env:QUACKATIME_API_URL="${apiUrl}"; irm ${origin}/install-windows.ps1 | iex`;

    const copyToClipboard = (
        text: string,
        setCopiedState: (copied: boolean) => void,
    ) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedState(true);
            setTimeout(() => setCopiedState(false), 2000);
        });
    };
    const [copied, setCopied] = useState(false);

    const [scriptCopied, setScriptCopied] = useState(false);
    const [selectedTab, setSelectedTab] = useState(os);

    const getCurrentCommand = () => {
        return selectedTab === "windows" ? windowsCommand : unixCommand;
    };

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold sm:text-3xl">Setup Quackatime</h1>
                <p className="text-muted-foreground text-lg">
                    Start tracking time with your editor.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <div>
                    <h3 className="text-lg font-medium">Your API key</h3>
                    <p className="text-sm text-muted-foreground">
                        This is your unique API key. Keep it secret and don't share it with
                        anyone.
                    </p>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                    <Input value={apiKey} readOnly className="font-mono sentry-mask" />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey, setCopied)}
                        className="flex-shrink-0"
                    >
                        {copied ? (
                            <CheckIcon className="h-4 w-4" />
                        ) : (
                            <ClipboardCopyIcon className="h-4 w-4" />
                        )}
                        <span className="sr-only">Copy API key</span>
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <div>
                    <h3 className="text-lg font-medium">Installation</h3>
                    <p className="text-sm text-muted-foreground">
                        Run this command in your terminal to install Quackatime with your
                        API key:
                    </p>
                </div>

                <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList>
                        <TabsTrigger value="windows">Windows</TabsTrigger>
                        <TabsTrigger value="unix">Linux/macOS</TabsTrigger>
                    </TabsList>

                    <div className="bg-transparent dark:bg-input/30 border border-input rounded-md p-4 font-mono text-sm overflow-x-auto w-full shadow-xs transition-[color,box-shadow] sentry-mask">
                        <TabsContent value="windows">{windowsCommand}</TabsContent>
                        <TabsContent value="unix">{unixCommand}</TabsContent>
                    </div>
                </Tabs>

                <div className="flex flex-col-reverse gap-2 md:flex-row md:gap-0 mt-4">
                    <p className="text-xs text-muted-foreground">
                        This script will create a <code>~/.wakatime.cfg</code> file on your
                        system with your API key and URL.
                        <br />
                        It'll also install the WakaTime extension if you have a{" "}
                        <a
                            href="https://github.com/quackatime/extension-installer#supported-ides"
                            className="underline"
                            target="_blank"
                            rel="noreferrer"
                        >
                            supported IDE/code editor
                        </a>{" "}
                        installed, although the script will still work if you don't.
                    </p>
                    <Button
                        size="sm"
                        className="w-full md:w-fit md:ml-auto"
                        onClick={() =>
                            copyToClipboard(getCurrentCommand(), setScriptCopied)
                        }
                    >
                        {scriptCopied ? (
                            <CheckIcon className="h-4 w-4" />
                        ) : (
                            <ClipboardCopyIcon className="h-4 w-4" />
                        )}
                        {scriptCopied ? "Copied!" : "Copy to clipboard"}
                    </Button>
                </div>
            </div>

            <p>
                Once you're done,{" "}
                <a
                    href="https://wakatime.com/help/editors"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                >
                    install an editor extension
                </a>{" "}
                and you're good to go!
            </p>
        </div>
    );
}
