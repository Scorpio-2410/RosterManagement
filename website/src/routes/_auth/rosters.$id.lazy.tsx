import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/rosters/$id')({
  component: Roster
})

function Roster(){

  return(
    <div>This Roster is $id</div>
  )
}