import {CommonServerOptions, defineConfig, HttpProxy, loadEnv, ProxyOptions} from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

let auth: string
try {
    //@ts-expect-error process not found
    auth = loadEnv('development', process.cwd())['VITE_DHIS_AUTH']
} catch (e) {
    throw new Error(`You have to specify VITE_DHIS_AUTH env variable. E.g. btoa('username:password') in JavaScript`)
}

const proxy: ProxyOptions = {
    target: 'https://dev.datim.org/',
    configure: (proxy:HttpProxy.Server, options:ProxyOptions) => {
        options.headers = {Authorization: `Basic ${auth}`}
    },
    secure: false,
    changeOrigin: true
};

const server:CommonServerOptions = {
    port: 3000,
    proxy: {
        '/api': proxy,
        '/dhis-web-commons': proxy,
        '/icons': proxy,
    }
}

export default defineConfig({
    plugins: [react(), visualizer()],
    base: '',
    server,
    preview: server,
    build:{
        modulePreload:false,
    },
})
