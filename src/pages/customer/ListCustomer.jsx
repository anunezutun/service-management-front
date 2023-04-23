import { useState } from "react";
import { useLoaderData, redirect } from 'react-router-dom'
import { listCustomers } from '../../data/CustomerOperations'
import ListCustomerTable from "../../components/customer/ListCustomerTable";

export function loader() {
  const userGuid = localStorage.getItem('userGuid')
  if (userGuid != null) {
    return listCustomers(userGuid)
  } else {
    return redirect('/login')
  }
}

function ListCustomer() {
  const response = useLoaderData().data
  var customers = [];
  response.map(item => {
    item.customerList.map(c => {
      var customer = c
      customer.owner = item.username
      customers.push(customer)
    })
  })

  const [value, setValue] = useState('')
  const [dataSource, setDatasurce] = useState(customers)
  const [tableFilter, setTableFilter] = useState([])

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value)
      const filterTable = dataSource.filter(o => Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
      ));
      setTableFilter([...filterTable])
    } else {
      setValue(e.target.value)
      setDatasurce([...dataSource])
    }
  }

  return (
    <>
      <h3 className='font-black text-lg text-blue-900'>Listado de Clientes</h3>
      {
        customers.length ?
          (
            <>
              <div className="mb-6 mt-2">
                <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Búsqueda"
                  defaultValue={value}
                  onChange={filterData}
                />
              </div>
              <table className='w-full bg-white shadow mt-5 table-auto border-separate'>
                <thead className='bg-blue-800 text-white text-left'>
                  <tr>
                    <th className='p-2'>Cliente</th>
                    <th className='p-2'>Credenciales</th>
                    <th className='p-2'>Contacto</th>
                    <th className='p-2'></th>
                  </tr>
                </thead>
                <tbody>
                {
                    value.length > 0 ?
                    tableFilter.map(customer => (
                      <ListCustomerTable
                        customer={customer}
                        key={customer.guid}
                      />
                    )) :
                    dataSource.map(customer => (
                      <ListCustomerTable
                        customer={customer}
                        key={customer.guid}
                      />
                    ))
                  }
                </tbody>
              </table>
            </>

          )
          :
          (
            <p className='text-center mt-10 uppercase font-bold text-red-500'>No hay clientes registrados</p>
          )
      }
    </>
  )
}

export default ListCustomer