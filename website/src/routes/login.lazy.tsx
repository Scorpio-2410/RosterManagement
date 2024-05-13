import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/login')({
  component: Login,
})

function Login(){
  return(
    <div className=' p-2 stroke-blue-700'>
      <h1>Login Page!</h1>
    </div>
  )
}