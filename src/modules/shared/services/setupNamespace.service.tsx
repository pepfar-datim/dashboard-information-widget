import api from './api.service'

const config = require("../../../config/config.json");

export default async function setupNamespace() {
    // Check if namespace exists
    const namespaces = await api.get('/dataStore')
    if (!namespaces.includes(config.datastoreNamespace)) {
        // Namespace does not yet exist
        const {datastoreNamespace, onlyOpenToSuperUsersKey} = config
        console.log(`Setting up namespace ${datastoreNamespace}`)
        const data = {[onlyOpenToSuperUsersKey]: false}
        await api.post(`/dataStore/${datastoreNamespace}/configuration`, data)
    }

} 