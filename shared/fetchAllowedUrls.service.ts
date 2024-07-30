
const defaultAllowedUrls = [
  'https://www.youtube.com/',
]

async function setupAllowedUrls() {
  const req = await fetch('/api/dataStore/dashboard-information/')
  const res = await req.json()
  if (!res.includes('allowedUrls')) {
    const setupReq = await fetch(
      '/api/dataStore/dashboard-information/allowedUrls',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(defaultAllowedUrls),
      }
    ) 
    const setupRes = await setupReq.json()
    console.log('Allowed URLs datastore setup: ', setupRes)
  }
}

export default async function fetchAllowedUrls(): Promise<string[]> {
  try {
    const req = await fetch('/api/dataStore/dashboard-information/allowedUrls')
    const res = await req.json()
    console.log('Allowed URLs fetched: ', res)
    if (res?.status === 'SUCCESS') {
      return await res
    } else {
      setupAllowedUrls()
      return defaultAllowedUrls
    }
  } catch (e) {
    setupAllowedUrls()
    return defaultAllowedUrls
  }
}