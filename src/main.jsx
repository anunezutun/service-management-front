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
        //action: registerCustomerAction,
      }
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