import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/profile')({
  component: () => <div>This is the profile page!</div>
})