import { useNavigate, Link } from "react-router-dom"
import { FaRegCopy, FaEye, FaEyeSlash } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from "react";

function ListCustomerTable({ customer }) {

  const navigate = useNavigate()
  const [showSolKey, setShowSolKey] = useState(false)
  const ofuscateSolKey = "*******"

  const showToast = () => {
    //setInputType(inputType === 'password' ? 'text' : 'password')
    //mostrar mensaje en un toast
  }

  return (
    <tr className="border-b">
      <td className='p-2'>
        <p className="text-gray-800">{customer.names}</p>
        <p>{customer.businessName}</p>
        <p><span className="font-bold">{customer.documentType}:</span> {customer.documentNumber}</p>
      </td>

      <td className='p-2'>
        <div className="flex">
          <p className="text-gray-600"><span className="text-gray-800 font-bold">Usuario: </span>{customer.solUser}</p>
          <div className="p-1 cursor-pointer">
            <CopyToClipboard text={customer.solUser} onCopy={showToast}>
              <FaRegCopy color="blue" />
            </CopyToClipboard>
          </div>
        </div>

        <div className='flex'>
          <p className="text-gray-600">
            <span className='text-gray-800 font-bold'>Clave Sol: </span>
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

      </td>


      <td className="p-2">
        <p className="text-gray-600"><span className="text-gray-800 font-bold">Correo: </span>{customer.email}</p>
        <p className="text-gray-600"><span className="text-gray-800 font-bold">Cel: </span>{customer.phoneNumber}</p>
      </td>

      <td className="p-2">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 font-bold text-xs"
          onClick={() => navigate('/cliente/detalle', {state:{customerGuid:customer.guid}})}
        >
          Ver Detalles
        </button>
      </td>
    </tr>
  )
}

export default ListCustomerTable