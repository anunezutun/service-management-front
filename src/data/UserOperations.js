export async function login(record) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_USERS_URL}/login`, {
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


export async function saveUser(record) {
  
  try {
    const response = await fetch(import.meta.env.VITE_API_USERS_URL, {
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

export async function listUsers() {

  const response = await fetch(import.meta.env.VITE_API_USERS_URL)
  return await response.json()

}

export async function getUser(guid) {

  const response = await fetch(`${import.meta.env.VITE_API_USERS_URL}/${guid}`)
  return await response.json()
}

export async function updateUser(requestBody) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_USERS_URL}`, {
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
