import { createFileRoute, redirect } from '@tanstack/react-router'
import { Mail } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/card'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/auth/verify')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/auth/signin' })
    }
    if (context.user.emailVerified) {
      throw redirect({ to: '/' })
    }
  },
  loader: async ({ context }) => {
    return {
      emailClient: getEmailClient(context.user?.email || ''),
    }
  },
})

function RouteComponent() {
  const { emailClient } = Route.useLoaderData()

  return (
    <div className="flex items-center justify-center px-4">
      <Card className="max-w-sm w-full shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pt-2">
          <Mail className="w-12 h-12 animate-pulse" />
          <CardTitle className="text-lg font-semibold">Verify your email</CardTitle>
          <p className="text-center text-muted-foreground text-sm">
            We've sent a verification link to your email. Click the button below to
            auto-open your inbox, or check your email and follow the link to verify your account.
          </p>
        </CardHeader>
        <CardContent>
          <Button asChild variant={emailClient.secondary ? "secondary" : "default"} className="w-full">
            <a href={emailClient.url} target="_blank" rel="noopener noreferrer">
              Open in {emailClient.name}
            </a>
          </Button>
          {/* <Button variant="secondary" className="w-full" onClick={() => resendVerification()}>
            Resend Email
          </Button> */}
        </CardContent>
      </Card>
    </div>
  )
}

const getEmailClient = (email: string) => {
  if (email.endsWith('@gmail.com') || email.endsWith('@googlemail.com')) {
    return { name: 'Gmail', url: 'https://mail.google.com' }
  }
  if (
    email.endsWith('@outlook.com') ||
    email.endsWith('@hotmail.com') ||
    email.endsWith('@live.com') ||
    email.endsWith('@msn.com')
  ) {
    return { name: 'Outlook', url: 'https://outlook.live.com' }
  }
  if (
    email.endsWith('@proton.me') ||
    email.endsWith('@protonmail.com') ||
    email.endsWith('@pm.me')
  ) {
    return { name: 'Proton Mail', url: 'https://mail.proton.me' }
  }
  if (email.endsWith('@yahoo.com')) {
    return { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' }
  }
  if (
    email.endsWith('@icloud.com') ||
    email.endsWith('@me.com') ||
    email.endsWith('@mac.com')
  ) {
    return { name: 'iCloud Mail', url: 'https://www.icloud.com/mail' }
  }
  return { name: 'Gmail', url: 'https://mail.google.com', secondary: true }
}

// // TODO: implement resendVerification logic to call API for resending the email
// function resendVerification() {
//   // call your API endpoint to resend verification
//   // show toast notification on success/failure
// }
