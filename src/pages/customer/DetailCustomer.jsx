import { useLocation, useLoaderData, useNavigate } from 'react-router-dom';
import { getCustomer } from "../../data/CustomerOperations";
import { useState, useEffect } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy, FaEye, FaEyeSlash } from 'react-icons/fa';

export async function loader(useLocation) {
  return null
}

export async function getCustomerByGuid(customerGuid) {

  const customer = await getCustomer(customerGuid)
  if (Object.values(customer).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No hay resultados'
    })
  }
  return customer.data
}

function DetailCustomer() {
  const location = useLocation();
  const [customer, setCustomer] = useState([])
  const [showSolKey, setShowSolKey] = useState(false)
  const navigate = useNavigate()

  const showToast = () => {
    //setInputType(inputType === 'password' ? 'text' : 'password')
    //mostrar mensaje en un toast
  }

  const ofuscateSolKey = "*******"

  useEffect(() => {
    getCustomerByGuid(location.state.customerGuid)
      .then(c => setCustomer(c))
  }, [])

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="font-bold uppercase mb-2">Datos del cliente</h3>
        <div className='flex'>
          <div className='w-1/2'>
            <p><span className='font-bold'>Nombres y Apellidos: </span>{customer.names}</p>
          </div>
          <div className='w-1/2'>
            <p><span className='font-bold'>Nombre Comercial: </span>{customer.businessName}</p>
          </div>
        </div>

        <div className='flex'>
          <div className='w-1/2'>
            <p><span className='font-bold'>Tipo de documento: </span>{customer.documentType}</p>
          </div>
          <div className='w-1/2'>
            <p><span className='font-bold'>Número de documento: </span>{customer.documentNumber}</p>
          </div>
        </div>
        <div className='flex'>
          <div className='w-1/2'>
            <p><span className='font-bold'>Número de contacto: </span>{customer.phoneNumber}</p>
          </div>
          <div className='w-1/2'>
            <p><span className='font-bold'>Correo: </span>{customer.email}</p>
          </div>
        </div>
        <div className='flex'>
          <div className='w-1/2'>
            <p><span className='font-bold'>Fecha de creación: </span>{customer.creationDate}</p>
          </div>
        </div>

        <div className='flex mt-3'>
          <div className='flex w-1/2'>
            <p><span className='font-bold'>Usuario Sol: </span>{customer.solUser}</p>
            <div className="p-1 cursor-pointer">
              <CopyToClipboard text={customer.solUser} onCopy={showToast}>
                <FaRegCopy color="blue" />
              </CopyToClipboard>
            </div>
          </div>

          <div className='flex w-1/2'>
            <p>
              <span className='font-bold'>Clave Sol: </span>
              {
                showSolKey ?
                  customer.solKey
                  :
                  ofuscateSolKey
              }
            </p>
            <div className="p-1 cursor-pointer">
              {
                showSolKey ?
                  <FaEyeSlash color="red" onClick={() => setShowSolKey(false)} />
                  :
                  <FaEye color="green" onClick={() => setShowSolKey(true)} />
              }

            </div>
            <div className="p-1 cursor-pointer">
              <CopyToClipboard text={customer.solKey} onCopy={showToast}>
                <FaRegCopy color="blue" />
              </CopyToClipboard>
            </div>
          </div>

        </div>
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold mt-2"
          onClick={() => navigate(`/cliente/editar/${customer.guid}`)}
        >
          Editar datos del cliente
        </button>
      </div>
    </>
  )
}

export default DetailCustomer