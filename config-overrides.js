const path = require('path')
const rewireYAML = require('react-app-rewire-yaml')

module.exports = function override (config, env) {
    config.module.rules.unshift({
        test: /__supportedThemes(\.js)?$/,
        use: path.resolve(__dirname, './webpackConfig/loaders/themeLoader.js')
    })

    config.module.rules.unshift({
        test: /index\.translations(\.js)?$/,
        use: path.resolve(__dirname, './webpackConfig/loaders/transLoader.js')
    })

    config = rewireYAML(config, env)

    return config
}
