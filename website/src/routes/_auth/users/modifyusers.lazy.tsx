import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/users/modifyusers')({
  component: () => <div>Hello /_auth/users/modifyusers!</div>
})