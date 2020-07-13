const fs = require('fs')
const path = require('path')
const glob = require('glob')
const md5 = require('md5')

module.exports = function transLoader (source, map) {
    const hash = md5(this.context)

    source += `
        import i18n from 'i18n';
        import flattenObject from 'util/flattenObject';
    `

    glob.sync(`${this.context}/**/!(*index.translations.js).+(yml|yaml)`).forEach(file => {
        const locale = /([\w-]+)\.(yaml|yml)$/.exec(file)[1]
        const localeVarName = locale.replace('-', '_')
        const baseName = path.basename(file)

        this.addDependency(file)

        source += `
            import ns${hash}${localeVarName} from './${baseName}'
            i18n.addResourceBundle('${locale}', '${hash}', flattenObject(ns${hash}${localeVarName}), true, true);
        `
    })

    source += `
        export default '${hash}';
    `

    return source
}
