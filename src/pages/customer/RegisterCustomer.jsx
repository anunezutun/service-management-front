import { Form, useActionData, redirect } from "react-router-dom"
import Error from "../../components/Error";
import { saveCustomer } from "../../data/CustomerOperations";

export function loader() {
  const userGuid = localStorage.getItem('userGuid')
  if (userGuid != null) {
    return null
  } else {
    return redirect('/login')
  }
}

export async function action({ request }) {
  const formData = await request.formData()
  const fields = Object.fromEntries(formData)

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


  const requestBody = {
    data: fields
  };

  const response = await saveCustomer(requestBody)
  const code = response.code;

  if (code === "A221") {
    return redirect('/')
  }

}


function RegisterCustomer() {
  const errores = useActionData()
  const userGuid = localStorage.getItem('userGuid')
  return (
    <>

      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="font-bold uppercase mb-2">registrar nuevo cliente</h3>
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form
          method="post"
          noValidate
        >
          <input type="hidden" name="userGuid" defaultValue={userGuid} />
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
              />
            </div>
          </div>

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 font-bold text-white text-lg"
            value="REGISTRAR CLIENTE"
          />
        </Form>
      </div>
    </>
  )
}

export default RegisterCustomer