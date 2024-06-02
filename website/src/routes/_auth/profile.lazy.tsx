import Hero from '@/components/hero'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/profile')({
  component: Profile
})

function Profile(){
  return(
    <Hero/>
  )
}