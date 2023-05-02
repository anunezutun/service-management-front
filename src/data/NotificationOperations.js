export async function saveNotification(request) {

  try {
    const response = await fetch(import.meta.env.VITE_API_NOTIFICATIONS_URL, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error);
  }
}

export async function listNotifications(guid) {

  const response = await fetch(`${import.meta.env.VITE_API_NOTIFICATIONS_URL}?` + new URLSearchParams({
    userGuid: guid
  }))
  return await response.json()

}