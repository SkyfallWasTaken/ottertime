import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'

export const APIRoute = createAPIFileRoute('/api/heartbeats')({
  POST: ({ request, params }) => {
    return json({ message: 'Hello "/api/heartbeats"!' })
  },
})
