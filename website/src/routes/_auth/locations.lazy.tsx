import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/locations')({
  component: () => <div>This is the Locations page!</div>
})