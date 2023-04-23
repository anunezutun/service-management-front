import { Form, useActionData, redirect } from "react-router-dom"
import { login } from "../../data/UserOperations";
import Error from "../../components/Error";
import { useState } from "react";

export async function action({ request }) {
  const formData = await request.formData()
  const fields = Object.fromEntries(formData)

  const username = formData.get('username')
  const password = formData.get('password')

  const errores = []

  //Inicio validación de campos obligatorios
  if (username === '') {
    errores.push('Debes ingresar el nombre de usuario.')
  }

  if (password === '') {
    errores.push('Debes ingresar la contraseña.')
  }
  //Fin validación de campos obligatorios

  if (Object.keys(errores).length) {
    return errores
  }

  const requestBody = {
    data: fields
  };

  const response = await login(requestBody)
  const code = response.code;

  if (code === "A204") {
    localStorage.setItem('userGuid', response.data.guid)
    return redirect('/')
  } else {
    errores.push('Credenciales inválidas, intente nuevamente.')
    return errores
  }

}

function Login() {

  let errores = useActionData()

  const [showErrorSection, setShowErrorSection] = useState(false); //validar luego

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Grupo Anthares
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Inicio de sesión
              </h1>
              <Form
                method="post"
                noValidate
              >

                <div className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre usuario</label>
                    <input
                      type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingresar nombre de usuario" required=""
                      onChange={() => setShowErrorSection(false)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="Ingresar contraseña" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>

                  {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

                  <button type="submit" className="w-full text-white bg-blue-800 text-center rounded-lg px-5 py-2.5">INGRESAR</button>

                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login