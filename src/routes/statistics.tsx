import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/statistics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/statistics"!</div>
}
