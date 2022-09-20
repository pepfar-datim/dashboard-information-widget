module.exports = {
    webpack: {
        configure: webpackConfig => {
            // ts-loader is required to reference external typescript projects/files (non-transpiled)
            webpackConfig.module.rules.push({
                test: /node_modules.+\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig-dev.json',
                },
            })
            return webpackConfig;
        }
    },
    jest:{
        configure:{
            watchPlugins: ['./src/test/failReporter.mjs']
        },
        // configure: (jestConfig, { env, paths, resolve, rootDir }) => {
        //     console.log(jestConfig)
        //     return jestConfig;
        // }
    }
};