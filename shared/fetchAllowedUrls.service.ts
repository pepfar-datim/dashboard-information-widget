
const defaultAllowedUrls = [
  'https://www.youtube.com/',
]

async function setupAllowedUrls() {
  const req = await fetch('/api/dataStore/dashboard-information/')
  const res = await req.json()
  if (!res.includes('allowedUrls')) {
    fetch(
      '/api/dataStore/dashboard-information/allowedUrls',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(defaultAllowedUrls),
      }
    ) 
  }
}

export default async function fetchAllowedUrls(): Promise<string[]> {
  try {
    const req = await fetch('/api/dataStore/dashboard-information/allowedUrls')
    const res = await req.json()
    if (Array.isArray(res)) {
      return res
    } else {
      setupAllowedUrls()
      return defaultAllowedUrls
    }
  } catch (e) {
    try {
      setupAllowedUrls()
    } catch (e) {
      console.error(`Unable to setup allowed URLs in the datastore, defaulting to youtube.com\n${e}`)
    }
    return defaultAllowedUrls
  }
}