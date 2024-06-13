import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/users/search-edit/$userid')({
  component: () => <div>Hello /_auth/users/search-edit/$userid!</div>
})