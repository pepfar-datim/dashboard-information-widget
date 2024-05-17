import {defineConfig, loadEnv, ProxyOptions, ServerOptions} from 'vite'
import minifyHtmlPlugin from "./plugin/minifyHtml.plugin";

const {VITE_DHIS_URL: target, VITE_DHIS_AUTH: auth } = loadEnv('development', process.cwd())

if (!target||!auth) throw new Error('Please specify DHIS2 instance & Auth in .env.local')



const proxy:ProxyOptions = {
    target,
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
    build: {
        assetsDir: 'assets_render'
    }
})
