import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/users')({
  component: () => <div>This is the users page!</div>
})