import testConfig from "./serverConfig.test.json";
import developmentConfig from "./serverConfig.dev.json";
import productionConfig from "./serverConfig.prod.json";

let config;

switch (process.env.NODE_ENV){
    case "production": config = productionConfig; break;
    case "test": config = testConfig; break;
    case "development": config = developmentConfig; break;
    default: config = developmentConfig; break;
}

export const baseUrl = config.baseUrl;
export const apiVersion = config.apiVersion;