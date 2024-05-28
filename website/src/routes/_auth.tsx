import { createFileRoute, redirect} from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad:() => {
    if(!isAuthenticated()){
      throw redirect({
        to: '/login'
      })
    }
  }
})