import {defineConfig, loadEnv, ProxyOptions, ServerOptions} from 'vite'
import minifyHtmlPlugin from "./plugin/minifyHtml.plugin";

let auth;
try {
    //@ts-expect-error process not defined
    auth = loadEnv('development', process.cwd())['VITE_DHIS_AUTH']
} catch (e) {
    //@ts-expect-error error not defined
    throw new Error(`You have to specify VITE_DHIS_AUTH env variable. E.g. btoa('username:password') in JavaScript`)
}



const proxy:ProxyOptions = {
    target: 'https://dev.datim.org/',
    // target: 'https://nr.testing.datim.org/',
    //@ts-expect-error proxy not used
    configure: (proxy, options) => {
        options.headers = {Authorization: `Basic ${auth}`}
    },
    secure: false,
    changeOrigin: true
};

const server:ServerOptions = {
    port: 3000,
    proxy: {
        '/api': proxy,
        '/dhis-web-commons': proxy,
        '/dhis-web-dashboard': proxy
    }
}

export default defineConfig({
    plugins: [minifyHtmlPlugin()],
    base: '',
    server,
    preview: server,
    // build: {
    //     assetsDir: 'search'
    // }
})
