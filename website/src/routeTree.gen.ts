/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthRostersIndexImport } from './routes/_auth/rosters/index'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const AuthProfileLazyImport = createFileRoute('/_auth/profile')()
const AuthDashboardLazyImport = createFileRoute('/_auth/dashboard')()
const AuthUsersCreateLazyImport = createFileRoute('/_auth/users/create')()
const AuthRostersIdLazyImport = createFileRoute('/_auth/rosters/$id')()
const AuthLocationsSearchModifyLazyImport = createFileRoute(
  '/_auth/locations/search-modify',
)()
const AuthLocationsCreateLazyImport = createFileRoute(
  '/_auth/locations/create',
)()
const AuthUsersSearchModifyDeleteIndexLazyImport = createFileRoute(
  '/_auth/users/search-modify-delete/',
)()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthProfileLazyRoute = AuthProfileLazyImport.update({
  path: '/profile',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth/profile.lazy').then((d) => d.Route))

const AuthDashboardLazyRoute = AuthDashboardLazyImport.update({
  path: '/dashboard',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/dashboard.lazy').then((d) => d.Route),
)

const AuthRostersIndexRoute = AuthRostersIndexImport.update({
  path: '/rosters/',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/rosters/index.lazy').then((d) => d.Route),
)

const AuthUsersCreateLazyRoute = AuthUsersCreateLazyImport.update({
  path: '/users/create',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/users/create.lazy').then((d) => d.Route),
)

const AuthRostersIdLazyRoute = AuthRostersIdLazyImport.update({
  path: '/rosters/$id',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/rosters/$id.lazy').then((d) => d.Route),
)

const AuthLocationsSearchModifyLazyRoute =
  AuthLocationsSearchModifyLazyImport.update({
    path: '/locations/search-modify',
    getParentRoute: () => AuthRoute,
  } as any).lazy(() =>
    import('./routes/_auth/locations/search-modify.lazy').then((d) => d.Route),
  )

const AuthLocationsCreateLazyRoute = AuthLocationsCreateLazyImport.update({
  path: '/locations/create',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/locations/create.lazy').then((d) => d.Route),
)

const AuthUsersSearchModifyDeleteIndexLazyRoute =
  AuthUsersSearchModifyDeleteIndexLazyImport.update({
    path: '/users/search-modify-delete/',
    getParentRoute: () => AuthRoute,
  } as any).lazy(() =>
    import('./routes/_auth/users/search-modify-delete.index.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_auth/dashboard': {
      preLoaderRoute: typeof AuthDashboardLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/profile': {
      preLoaderRoute: typeof AuthProfileLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/locations/create': {
      preLoaderRoute: typeof AuthLocationsCreateLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/locations/search-modify': {
      preLoaderRoute: typeof AuthLocationsSearchModifyLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/rosters/$id': {
      preLoaderRoute: typeof AuthRostersIdLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/users/create': {
      preLoaderRoute: typeof AuthUsersCreateLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/rosters/': {
      preLoaderRoute: typeof AuthRostersIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/users/search-modify-delete/': {
      preLoaderRoute: typeof AuthUsersSearchModifyDeleteIndexLazyImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AuthRoute.addChildren([
    AuthDashboardLazyRoute,
    AuthProfileLazyRoute,
    AuthLocationsCreateLazyRoute,
    AuthLocationsSearchModifyLazyRoute,
    AuthRostersIdLazyRoute,
    AuthUsersCreateLazyRoute,
    AuthRostersIndexRoute,
    AuthUsersSearchModifyDeleteIndexLazyRoute,
  ]),
])

/* prettier-ignore-end */
