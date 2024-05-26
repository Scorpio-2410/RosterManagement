import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/rosters/$id')({
  component: Roster
})

function Roster(){
  return(
    <div>Hello /rosters/$id!</div>
  )
}