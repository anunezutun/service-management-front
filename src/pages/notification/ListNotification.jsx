import { useState, useEffect } from "react";
import { useLoaderData, redirect } from 'react-router-dom'
import { listNotifications } from '../../data/NotificationOperations'
import { FaCheck, FaRegClock } from 'react-icons/fa';

export function loader() {
  const userGuid = localStorage.getItem('userGuid')
  if (userGuid != null) {
    return listNotifications(userGuid)
  } else {
    return redirect('/login')
  }
}

function ListNotification() {
  const response = useLoaderData().data
  const [activeTab, setActiveTab] = useState("tab1");
  const [notificationList, setNotificationList] = useState(response.pendingList);

  const changeTab = (tab, notifications) => {
    setActiveTab(tab)
    setNotificationList(notifications)
  };

  return (
    <>
      <h3 className='font-black text-lg text-blue-900'>Listado de Notificaciones</h3>

      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="mr-2">
            <button
              onClick={() => changeTab("tab1", response.pendingList)}
              className={activeTab === "tab1" ?
                "inline-flex p-4 border-b-2 rounded-t-lg group text-blue-600 border-blue-600"
                :
                "inline-flex p-4 border-b-2 rounded-t-lg group border-transparent hover:text-gray-600 hover:border-gray-300"}
            >
              <FaRegClock className="w-5 h-5 mr-2" />Pendientes
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => changeTab("tab2", response.sentList)}
              className={activeTab === "tab2" ?
                "inline-flex p-4 border-b-2 rounded-t-lg group text-blue-600 border-blue-600"
                :
                "inline-flex p-4 border-b-2 rounded-t-lg group border-transparent hover:text-gray-600 hover:border-gray-300"}
            >
              <FaCheck className="w-5 h-5 mr-2" />Entregados
            </button>
          </li>
        </ul>
      </div>


      {
        notificationList.length ?
          (
            <table className='w-full bg-white shadow mt-5 table-auto border-separate'>
              <thead className='bg-blue-800 text-white text-left'>
                <tr>
                  <th className='p-2'>Fecha programada</th>
                  <th className='p-2'>Mensaje</th>
                  <th className='p-2'>Celular de envío</th>
                </tr>
              </thead>
              <tbody>
                {
                  notificationList.map(notification => (
                    <tr key={notification.guid} className="border-b">
                      <td>
                        <p>{notification.remindDate}</p>
                      </td>
                      <td className='p-2'>
                        <p>{notification.message}</p>
                      </td>
                      <td className="p-2">
                        <p>{notification.phoneNumber}</p>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
          :
          (
            <p className='text-center mt-10 uppercase font-bold text-red-500'>No hay notificaciones que mostrar</p>
          )

      }
    </>
  )
}

export default ListNotification