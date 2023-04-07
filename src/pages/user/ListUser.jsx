import React from 'react'
import { useLoaderData, redirect, useNavigate } from 'react-router-dom'
import { listUsers } from "../../data/UserOperations";

export function loader() {
  const userGuid = localStorage.getItem('userGuid')
  if (userGuid != null) {
    return listUsers()
  } else {
    return redirect('/login')
  }
}


function ListUser() {
  const navigate = useNavigate()
  const users = useLoaderData().data
 
  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="font-bold uppercase mb-2">Listado de usuarios</h3>

        <table className='w-full bg-white shadow mt-5 table-auto border-separate'>
          <thead className='bg-blue-800 text-white text-left'>
            <tr>
              <th className='p-2'>Nombres</th>
              <th className='p-2'>Nombre de usuario</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.guid} className="border-b">
                  <td>
                    <p>{user.names}</p>
                  </td>
                  <td className='p-2'>
                    <p>{user.username}</p>
                  </td>
                  <td className="p-2">
                    <p className="text-gray-600"><span className="text-gray-800 font-bold">Correo: </span>{user.email}</p>
                    <p className="text-gray-600"><span className="text-gray-800 font-bold">Cel: </span>{user.phoneNumber}</p>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 font-bold text-xs"
                      onClick={() => navigate(`/usuario/editar/${user.guid}`)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default ListUser