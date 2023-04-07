import React from 'react'
import { Form, redirect, useLoaderData } from "react-router-dom"
import { getUser, updateUser } from "../../data/UserOperations";

export async function loader({ params }) {

  const userGuid = localStorage.getItem('userGuid')
  if (userGuid == null) {
    return redirect('/login')
  }

  const user = await getUser(params.userGuid)
  if (Object.values(user).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No hay resultados'
    })
  }
  return user.data
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const fields = Object.fromEntries(formData)
  fields.guid = params.userGuid;

  const requestBody = {
    data: fields
  };

  const response = await updateUser(requestBody)
  const code = response.code;

  if (code === "A202") {
    return redirect(`/usuario/listar`)
  }


}

function EditUser() {
  const user = useLoaderData()
  
  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="font-bold uppercase mb-2">editar usuario</h3>

        <Form
          method="post"
          noValidate
        >
          <div className="flex flex-wrap mb-3">
            <div className="w-full md:w-1/3">
              <label
                className="text-gray-800"
                htmlFor="names"
              >Nombres y Apellidos:</label>
              <input
                id="names"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombres y Apellidos"
                name="names"
                defaultValue={user?.names}
              />
            </div>

            <div className="w-full md:w-1/3 pl-3">
              <label
                className="text-gray-800"
                htmlFor="phoneNumber"
              >N° Celular:</label>
              <input
                id="phoneNumber"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Celular"
                name="phoneNumber"
                defaultValue={user?.phoneNumber}
              />
            </div>

            <div className="w-full md:w-1/3 pl-3">
              <label
                className="text-gray-800"
                htmlFor="email"
              >E-mail:</label>
              <input
                id="email"
                type="email"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Email"
                name="email"
                defaultValue={user?.email}
              />
            </div>


          </div>

          <div className="flex flex-wrap mb-3">
            <div className="w-full md:w-1/2">
              <label
                className="text-gray-800"
                htmlFor="username"
              >Nombre de usuario:</label>
              <input
                id="username"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombre de usuario"
                name="username"
                defaultValue={user?.username}
              />
            </div>

            <div className="w-full md:w-1/2 pl-3">
              <label
                className="text-gray-800"
                htmlFor="password"
              >Contraseña:</label>
              <input
                id="password"
                type="password"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Contraseña"
                name="password"
                defaultValue={user?.password}
              />
            </div>

          </div>


          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 font-bold text-white text-lg"
            value="EDITAR USUARIO"
          />

        </Form>
      </div>
    </>
  )
}

export default EditUser