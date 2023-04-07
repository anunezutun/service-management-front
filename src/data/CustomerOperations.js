export async function listCustomers(guid) {

  const response = await fetch(`${import.meta.env.VITE_API_CUSTOMERS_URL}/list/${guid}`)
  return await response.json()

}

export async function getCustomer(guid) {

  const response = await fetch(`${import.meta.env.VITE_API_CUSTOMERS_URL}/${guid}`)
  return await response.json()
}

export async function saveCustomer(record) {
  
  try {
    const response = await fetch(import.meta.env.VITE_API_CUSTOMERS_URL, {
      method: 'POST',
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error);
  }
}

export async function updateCustomer(requestBody) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_CUSTOMERS_URL}`, {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error);
  }
}