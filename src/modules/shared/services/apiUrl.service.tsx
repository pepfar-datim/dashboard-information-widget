import devServerConfig from "../../../config/serverConfig.dev.json";
import prodServerConfig from "../../../config/serverConfig.prod.json";

let serverConfig;
if (process.env.NODE_ENV === 'production') serverConfig = prodServerConfig;
else serverConfig = devServerConfig;

export let baseUrl = serverConfig.baseUrl;
