import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        testTimeout:1e6,
        globals: true,
        environment: 'happy-dom',
    },
})