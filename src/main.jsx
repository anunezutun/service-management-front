import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Index from './pages/Index'
import Layout from './components/Layout'
import Login, { action as loginAction } from './pages/user/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListUser, { loader as listUserLoader } from './pages/user/ListUser'
import EditUser, { loader as editUserLoader, action as editUserAction } from './pages/user/EditUser'
import RegisterCustomer, { loader as registerCustomLoader, action as registerCustomerAction } from './pages/customer/RegisterCustomer'
import ListCustomer, { loader as listCustomerLoader} from './pages/customer/ListCustomer'
import DetailCustomer, { loader as detailCustomerLoader } from './pages/customer/DetailCustomer'
import EditCustomer, { loader as editCustomLoader, action as editCustomerAction} from './pages/customer/EditCustomer'
import RegisterNotification, {action as registerNotificationAction } from './pages/notification/RegisterNotification'
import ListNotification, { loader as listNotificationLoader } from './pages/notification/ListNotification'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    action: loginAction,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ListCustomer />,
        loader: listCustomerLoader
      },
      {
        path: '/usuario/listar',
        element: <ListUser />,
        loader: listUserLoader,
      },
      {
        path: '/usuario/editar/:userGuid',
        element: <EditUser />,
        loader: editUserLoader,
        action: editUserAction,
      },
      {
        path: '/cliente/registrar',
        element: <RegisterCustomer />,
        loader: registerCustomLoader,
        action: registerCustomerAction,
      },
      ,
      {
        path: '/cliente/listar',
        element: <ListCustomer />,
        loader: listCustomerLoader,
      },
      {
        path: '/cliente/detalle',
        element: <DetailCustomer />,
        loader: detailCustomerLoader,
      },
      {
        path: '/cliente/editar/:customerGuid',
        element: <EditCustomer />,
        loader: editCustomLoader,
        action: editCustomerAction,
      },
      {
        path: '/notificacion/registrar',
        element: <RegisterNotification />,
        action: registerNotificationAction,
      },
      {
        path: '/notificacion/listar',
        element: <ListNotification />,
        loader: listNotificationLoader,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
    />
  </React.StrictMode>,
)