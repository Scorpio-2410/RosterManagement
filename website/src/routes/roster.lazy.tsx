import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/roster')({
  component: Roster,
})

function Roster(){
  return(
    <div className='p-2'>
      <h1>Create your roster!</h1>
    </div>
  )
}