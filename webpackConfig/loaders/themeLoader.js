const path = require('path')
const glob = require('glob')

module.exports = function themeLoader (source, map) {
    const themes = glob.sync(`${this.context}/**/!(*__supportedThemes).js`)
    let themePaths = {}

    themes.forEach(theme => {
        const baseName = path.basename(theme, '.js')
        const relativePath = path.relative(process.cwd(), theme).replace(/^src\//, '')

        path.resolve()

        this.addDependency(theme)

        themePaths[`${baseName}`] = relativePath
    })

    source = `
        export default ${JSON.stringify(themePaths)};
    `

    return source
}
