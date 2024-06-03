import CreateLocationForm from '@/components/createlocationform'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/locations')({
  component: Location
})

function Location(){
  return(
    <CreateLocationForm/>
  )
}