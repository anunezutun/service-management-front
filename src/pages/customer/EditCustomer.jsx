import { Form, useLoaderData, useNavigate, useActionData, redirect } from 'react-router-dom';
import Error from "../../components/Error";
import { getCustomer, updateCustomer } from '../../data/CustomerOperations'
import { useState, useEffect } from "react";

export async function loader({ params }) {

  const userGuid = localStorage.getItem('userGuid')
  if (userGuid == null) {
    return redirect('/login')
  }

  const customer = await getCustomer(params.customerGuid)
  if (Object.values(customer).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No hay resultados'
    })
  }
  
  return customer.data
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const fields = Object.fromEntries(formData)
  
  const requestBody = {
    data: fields
  };

  const names = formData.get('names')

  const errores = []
  
  //Inicio validación de campos obligatorios
  if (names === '') {
    errores.push('Debes ingresar el nombre del cliente.')
  }

  //Fin validación de campos obligatorios

  if (Object.keys(errores).length) {
    return errores
  }
  const response = await updateCustomer(requestBody)
  const code = response.code;

  if (code === "A222") {
    return redirect(`/cliente/listar`)
  }

}

function EditCustomer() {
  
  const errores = useActionData()
  const customer = useLoaderData()

  const userGuid = localStorage.getItem('userGuid')

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="font-bold uppercase mb-2">Editar datos del Cliente</h3>
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form
          method="post"
          noValidate
        >
          <input type="hidden" name="userGuid" defaultValue={userGuid} />
          <input type="hidden" name="guid" defaultValue={customer.guid} />
          <div className="flex flex-wrap mb-3">
            <div className="w-full md:w-1/2">
              <label
                className="text-gray-800"
                htmlFor="names"
              >Nombres y Apellidos:</label>
              <input
                id="names"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombres y Apellidos del Cliente"
                name="names"
                defaultValue={customer?.names}
              />
            </div>

            <div className="w-full md:w-1/2 pl-3">
              <label
                className="text-gray-800"
                htmlFor="businessName"
              >Nombre Comercial:</label>
              <input
                id="businessName"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombre Comercial"
                name="businessName"
                defaultValue={customer?.businessName}
              />
            </div>

          </div>

          <div className="flex flex-wrap mb-3">
            <div className="w-full md:w-1/2">
              <label
                className="text-gray-800"
                htmlFor="documentType"
              >Tipo de documento:</label>
              <select
                id="documentType"
                className="mt-2 block w-full p-3 bg-gray-50 border rounded-lg"
                name="documentType"
                defaultValue={(customer?.documentType.trim() !== '') ? customer?.documentType : 'DEFAULT'}
              >
                <option value="DEFAULT">--Elige una opción--</option>
                <option value="DNI">DNI</option>
                <option value="RUC">RUC</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="w-full md:w-1/2 pl-3">
              <label
                className="text-gray-800"
                htmlFor="documentNumber"
              >Número de Documento:</label>
              <input
                id="documentNumber"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Número de Documento"
                name="documentNumber"
                defaultValue={customer?.documentNumber}
              />
            </div>

          </div>

          <div className="flex flex-wrap mb-3">
            <div className="w-full md:w-1/2">
              <label
                className="text-gray-800"
                htmlFor="phoneNumber"
              >N° Celular:</label>
              <input
                id="phoneNumber"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Número de contacto del Cliente"
                name="phoneNumber"
                defaultValue={customer?.phoneNumber}
              />
            </div>

            <div className="w-full md:w-1/2 pl-3">
              <label
                className="text-gray-800"
                htmlFor="email"
              >E-mail:</label>
              <input
                id="email"
                type="email"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Email del Cliente"
                name="email"
                defaultValue={customer?.email}
              />
            </div>
          </div>

          <div className="flex flex-wrap mb-3">
            <div className="w-full md:w-1/2">
              <label
                className="text-gray-800"
                htmlFor="solUser"
              >Usuario Sol:</label>
              <input
                id="solUser"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Usuario sol"
                name="solUser"
                defaultValue={customer?.solUser}
              />
            </div>

            <div className="w-full md:w-1/2 pl-3">
              <label
                className="text-gray-800"
                htmlFor="solKey"
              >Clave Sol:</label>
              <input
                id="solKey"
                type="password"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Clave Sol"
                name="solKey"
                defaultValue={customer?.solKey}
              />
            </div>
          </div>

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 font-bold text-white text-lg"
            value="GUARDAR CAMBIOS"
          />
        </Form>
      </div>
    </>
  )
}

export default EditCustomer