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
        <h2 className='text-xl font-black text-center text-white'>Anthares</h2>
        <nav className='mt-10'>
          
        </nav>
      </aside>
      <div className='md:w-4/5 p-10 md:h-screen overflow-scroll'>
        <Outlet />
      </div>

    </div>
  )
}

export default Layout