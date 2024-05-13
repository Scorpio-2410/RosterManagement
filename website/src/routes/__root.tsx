import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex justify-between">
        <div className='flex gap-2'>
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/roster" className="[&.active]:font-bold">
            Roster
          </Link>
        </div>
        <div>
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
        </div>  
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})