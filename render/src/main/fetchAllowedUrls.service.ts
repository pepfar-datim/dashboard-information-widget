
const defaultAllowedUrls = [
  'https://www.youtube.com/',
]

export default async function fetchAllowedUrls(): Promise<string[]> {
  try {
    const req = await fetch('/api/dataStore/dashboard-information/allowedUrls')
    return await req.json()
  } catch (e) {
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
    return defaultAllowedUrls
  }
}