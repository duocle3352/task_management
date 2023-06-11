import { useRoutes, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routes from '~/configs/routes'
import { RootState } from '~/redux/store'
import { DefaultLayout } from '~/layouts/DefaultLayout'
import { Login } from '~/pages/Login'
import { Register } from '~/pages/Register'
import { Home } from '~/pages/Home'
import { Profile } from '~/pages/Profile'

const ProtectedRoute = () => {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.authenticate.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to={routes.login} />
}

const RejectedRoute = () => {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.authenticate.isAuthenticated)
  return !isAuthenticated ? <Outlet /> : <Navigate to={routes.home} />
}

const useRoutesElement = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: routes.home,
          index: true,
          element: (
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          )
        },
        {
          path: routes.profile,
          element: (
            <DefaultLayout>
              <Profile />
            </DefaultLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: routes.login,
          element: <Login />
        },
        {
          path: routes.register,
          element: <Register />
        }
      ]
    }
  ])

  return routeElements
}

export default useRoutesElement
