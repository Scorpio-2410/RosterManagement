import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/users')({
  component: Users
})

function Users(){
  return(
    <div>Hello</div>
  )
}