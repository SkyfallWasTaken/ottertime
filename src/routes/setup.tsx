import { createFileRoute } from '@tanstack/react-router'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { CheckIcon, ClipboardCopyIcon } from "lucide-react"
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/setup')({
  component: RouteComponent,
})

function RouteComponent() {
  const copyToClipboard = (text: string, setCopiedState: (copied: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedState(true)
      setTimeout(() => setCopiedState(false), 2000)
    })
  }
  const [copied, setCopied] = useState(false)
  const apiKey = "5roUc8h19k7kRLDgchaEOneQyhwfRCcd" // FIXME: replace with actual API key

  const [scriptCopied, setScriptCopied] = useState(false)
  const [hostname, setHostname] = useState("")

  useEffect(() => {
    setHostname(window.location.host)
  }, [])

  // FIXME: replace with real command
  const curlCommand = `curl -fsSL https://${hostname}/dl/setup.sh | QUACKATIME_API_KEY="${apiKey}" bash`

  return (
    <div className="space-y-4">
      <div>
        <h1 className='text-2xl font-bold sm:text-3xl'>Setup Quackatime</h1>
        <p className="text-muted-foreground text-lg">Start tracking time with your editor.</p>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-medium">Your API key</h3>
          <p className="text-sm text-muted-foreground">
            This is your unique API key. Keep it secret and don't share it with anyone.
          </p>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <Input value={apiKey} readOnly className="font-mono w-full sm:w-3/5 md:w-3/10" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(apiKey, setCopied)}
            className="flex-shrink-0"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardCopyIcon className="h-4 w-4" />}
            <span className="sr-only">Copy API key</span>
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <h3 className="text-lg font-medium">Installation</h3>
          <p className="text-sm text-muted-foreground">
            Run this command in your terminal to install QuackaTime with your API key:
          </p>
        </div>

        <div className="relative mb-2">
          <div className="bg-transparent dark:bg-input/30 border border-input rounded-md p-4 font-mono text-sm overflow-x-auto w-full shadow-xs transition-[color,box-shadow]">{curlCommand}</div>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => copyToClipboard(curlCommand, setScriptCopied)}
          >
            {scriptCopied ? <CheckIcon className="h-4 w-4" /> : <ClipboardCopyIcon className="h-4 w-4" />}
            {scriptCopied ? "Copied!" : "Copy to clipboard"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          This script will create a <code>~/.wakatime.cfg</code> file on your system with your API key and URL.<br />
          It'll also install the WakaTime extension if you have VSCode installed, although the script will still work if you don't.
        </p>
      </div>

      <p>Once you're done, <a href="https://wakatime.com/help/editors" className="underline" target="_blank">install an editor extension</a> and you're done!</p>
    </div>
  )
}
