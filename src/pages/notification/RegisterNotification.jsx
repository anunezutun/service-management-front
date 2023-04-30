import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Error from "../../components/Error";
import { saveNotification } from "../../data/NotificationOperations"; 

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

  const message = fields.message
  const hour = fields.hour
  const minute = fields.minute
  const date = fields.date
  const phoneNumber = fields.phoneNumber

  const errores = []

  //Inicio validación de campos obligatorios
  if (message === '') {
    errores.push('Debes ingresar el mensaje de la notificación.')
  }
  if (hour === 'DEFAULT') {
    errores.push('Debes elegir la hora.')
  }
  if (minute === 'DEFAULT') {
    errores.push('Debes elegir el minuto.')
  }
  if (date === '') {
    errores.push('Debes elegir la fecha.')
  }
  if (phoneNumber === '') {
    errores.push('Debes ingresar un número de celular.')
  }
  //Fin validación de campos obligatorios

  //AGREGAR VALIDACION DE FECHA ANTERIOR

  if (Object.keys(errores).length) {
    return errores
  }

  const requestBody = {
    data: fields
  };

  const response = await saveNotification(requestBody)
  const code = response.code;

  if (code === "A241") {
    return redirect('/')
  }

}

function RegisterNotification() {
  const userGuid = localStorage.getItem('userGuid')
  const errores = useActionData()
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="font-bold uppercase mb-2">programar nueva notificación</h3>
      {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

      <Form
        method="post"
        noValidate
      >

        <div className="w-full mb-3">
          <label
            className="text-gray-800"
            htmlFor="message"
          >Mensaje de la notificación:</label>
          <textarea
            id="message"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Ingresar el mensaje"
            name="message"
            rows="4"
          />
        </div>

        <div className="flex flex-wrap mb-3">

          <div className="w-full md:w-1/3">
            <label
              className="text-gray-800"
              htmlFor="hour"
            >Hora:</label>
            <select
              id="hour"
              className="mt-2 block w-full p-3 bg-gray-50 border rounded-lg"
              name="hour"
            >
              <option value="DEFAULT">--Elige una opción--</option>
              <option value="7">07</option>
              <option value="8">08</option>
              <option value="9">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
            </select>
          </div>

          <div className="w-full md:w-1/3 pl-3">
            <label
              className="text-gray-800"
              htmlFor="minute"
            >Minuto:</label>
            <select
              id="minute"
              className="mt-2 block w-full p-3 bg-gray-50 border rounded-lg"
              name="minute"
            >
              <option value="DEFAULT">--Elige una opción--</option>
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="30">45</option>
            </select>
          </div>

          <div className="w-full md:w-1/3 pl-3">
            <label
              className="text-gray-800"
              htmlFor="date"
            >Fecha:</label>
            <input
              id="date"
              type="date"
              className="mt-2 block w-full p-3 bg-gray-50"
              name="date"
            />
          </div>

        </div>

        <div className="flex flex-wrap mb-3">
          

          <div className="w-full md:w-1/3">
            <label
              className="text-gray-800"
              htmlFor="phoneNumber"
            >Celular:</label>
            <input
              id="phoneNumber"
              type="text"
              className="mt-2 block w-full p-3 bg-gray-50"
              placeholder="Celular de envío de la notificación"
              name="phoneNumber"
            />
          </div>


        </div>

        <input type="hidden" name="userGuid" defaultValue={userGuid} />

        <input
          type="submit"
          className="mt-5 w-full bg-blue-800 p-3 font-bold text-white text-lg"
          value="REGISTRAR NOTIFICACIÓN"
        />
      </Form>
    </div>
  )
}

export default RegisterNotification