import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex justify-between">
        <div className='flex gap-2'>
          <Link to="/" className="[&.active]:font-bold text-blue-400">
            Home
          </Link>{' '}
          <Link to="/rosters" className="[&.active]:font-bold text-blue-400">
            Rosters
          </Link>
        </div>
        <div>
          <Link to="/login" className="[&.active]:font-bold text-blue-400">
            Login
          </Link>
        </div>  
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
})