
const dataStoreKey = 'Allowed iframe domains'
const defaultAllowedIframeDomains = [
  'https://www.youtube.com/',
]

async function setupConfiguration() {
  const req = await fetch('/api/dataStore/dashboard-information/')
  const res = await req.json()
  if (!res.includes('configuration')) {
    fetch(
      '/api/dataStore/dashboard-information/configuration',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          [dataStoreKey]: defaultAllowedIframeDomains,
          'Only open to superusers': false,
        }),
      }
    ) 
  }
  const confReq = await fetch('/api/dataStore/dashboard-information/configuration')
  const confRes = await confReq.json()
  if (!(dataStoreKey in confRes)) {
    fetch(
      '/api/dataStore/dashboard-information/configuration',
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          [dataStoreKey]: defaultAllowedIframeDomains,
          'Only open to superusers': confRes?.['Only open to superusers'] || false,
        }),
      }
    ) 
  }
}

export default async function fetchAllowedIframeDomains(): Promise<string[]> {
  try {
    const req = await fetch('/api/dataStore/dashboard-information/configuration')
    const res = await req.json()
    if (dataStoreKey in res && Array.isArray(res[dataStoreKey])) {
      return res[dataStoreKey]
    } else {
      setupConfiguration()
      return defaultAllowedIframeDomains
    }
  } catch (e) {
    try {
      setupConfiguration()
    } catch (e) {
      console.error(`Unable to setup allowed URLs in the datastore, defaulting to youtube.com\n${e}`)
    }
    return defaultAllowedIframeDomains
  }
}