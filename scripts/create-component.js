const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))

const componentName = argv['_'][0]
const basePath = path.resolve('src/components')

const hasTranslations = argv['trans'] === true
const hasThemes = argv['themed'] === true
const dryRun = argv['dry'] === true

const componentPath = path.resolve(basePath + path.sep + componentName)
let content
console.log(`Create component directory: ${componentPath}`)

if (!dryRun) {
    fs.mkdirSync(componentPath)
}

console.log(`Create component index: ${componentPath}/index.js`)
content = `// @flow
import React from 'react'

import styles from './styles.module.scss'
`

if (hasTranslations) {
    content += `
import { withTranslation } from 'react-i18next'
import transDomain from './translations/index.translations'
`
}

if (hasThemes) {
    content += `
import withTheme from 'hoc/withTheme'
import themes from './themes/__supportedThemes'
`
}

let comp = `function ${componentName} () {
    return (
        <div/>
    )
}`

if (hasThemes) {
    comp = `withTheme(themes)(${comp})`
}

if (hasTranslations) {
    comp = `withTranslation(transDomain)(${comp})`
}

content += `
export default ${comp}
`

if (!dryRun) {
    fs.writeFileSync(componentPath + '/index.js', content)
} else {
    console.log(content)
}

console.log(`Create component style: ${componentPath}/${componentName}.module.scss`)
content = `:local {}`

if (!dryRun) {
    fs.writeFileSync(`${componentPath}/styles.module.scss`, content)
} else {
    console.log(content)
}

console.log(`Create images directory: ${componentPath}/images`)

if (!dryRun) {
    fs.mkdirSync(`${componentPath}/images`)
}

if (hasThemes) {
    console.log(`Create themes directory: ${componentPath}/themes`)

    if (!dryRun) {
        fs.mkdirSync(`${componentPath}/themes`)
        fs.writeFileSync(componentPath + '/themes/__supportedThemes.js', '')
        fs.writeFileSync(componentPath + '/themes/base.js', 'export default {}')
    }
}

if (hasTranslations) {
    console.log(`Create translations directory: ${componentPath}/translations`)

    if (!dryRun) {
        fs.mkdirSync(`${componentPath}/translations`)
        fs.writeFileSync(componentPath + '/translations/index.translations.js', '')
        fs.writeFileSync(componentPath + '/translations/en.yaml', '_:_')
    }
}
