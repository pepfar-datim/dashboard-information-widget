import {defineConfig} from 'vitest/config'

// let testTimeout = process.env.NODE_ENV==='cloud'?2e4:1e4

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        // environment: 'happy-dom',
        // testTimeout,
    },
})