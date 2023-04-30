import { Outlet, Link, useLocation, redirect } from 'react-router-dom'

function Layout() {
  const location = useLocation();

  const userGuid = localStorage.getItem('userGuid')
  /*if (userGuid == null) {
    return redirect('/login')
  }*/

  return (
    <div className='md:flex md:min-h-screen'>
      <aside className='md:w-1/5 bg-blue-900 px-5 py-10'>
        <h2 className='text-xl font-black text-center text-white'>Grupo Anthares</h2>
        <nav className='mt-10'>
          <Link
            to={`/usuario/editar/${userGuid}`}
            className={`${location.pathname === `/usuario/editar/${userGuid}` ? 'text-yellow-300' : 'text-white'} block mt-2 hover:text-yellow-300`}
          >
            Editar mis datos
          </Link>

          <Link
            to="/cliente/registrar"
            className={`${location.pathname === '/cliente/registrar' ? 'text-yellow-300' : 'text-white'} block mt-2 hover:text-yellow-300`}
          >
            Registar Nuevo Cliente
          </Link>
          <Link
            to="/cliente/listar"
            className={`${location.pathname === '/cliente/listar' ? 'text-yellow-300' : 'text-white'} block mt-2 hover:text-yellow-300`}
          >
            Listado de Clientes
          </Link>
          <Link
            to="/notificacion/registrar"
            className={`${location.pathname === '/notificacion/registrar' ? 'text-yellow-300' : 'text-white'} block mt-2 hover:text-yellow-300`}
          >
            Registrar notificación
          </Link>

        </nav>
      </aside>
      <div className='md:w-4/5 p-10 md:h-screen overflow-scroll'>
        <Outlet />
      </div>

    </div>
  )
}

export default Layout