// @flow
import * as React from 'react'

import { Store } from 'Store.js'
import globalThemes from 'themes/__supportedThemes'

export default function withTheme (supportedThemes) {
    return function (WrappedComponent) {
        // Depending on an implementation detail is not smart... but there is no other way
        const isForwardRef = WrappedComponent.$$typeof === Symbol.for('react.forward_ref')

        function Themed (props, ref) {
            const [loading, setLoading] = React.useState(true)
            const [theme, setTheme] = React.useState(null)
            const { state } = React.useContext(Store)

            const themeName = computeStyle(state.campaign, supportedThemes)

            if (loading) {
                loadTheme(themeName, supportedThemes, state.campaign)
                    .then(theme => {
                        if (typeof theme.default !== 'function') {
                            setTheme(theme.default)
                            setLoading(false)
                        } else {
                            import(`themes/${themeName}`)
                                .then(baseTheme => {
                                    setTheme(theme.default(baseTheme.default))
                                    setLoading(false)
                                })
                        }
                    })
                    .catch(err => { console.error('Something went wrong when trying to import a subtheme (it probably doesn\'t exist): ', err) })

                return <div>Loading theme...</div>
            }

            // Necessary for the presentation "Live Preview" due to the Safari iframe bug
            window.top.postMessage(document.body.scrollHeight, '*')

            if (isForwardRef && ref) {
                props = { ...props, ref: ref }
            }

            return <WrappedComponent themeName={themeName} theme={theme} {...props} />
        }

        if (isForwardRef) {
            return React.forwardRef(Themed)
        }

        return Themed
    }
}

function computeStyle (campaign, supportedThemes): string {
    const { style } = campaign

    // we have a predefined style, so return that
    if (typeof style !== 'undefined' && style !== '' && style !== null) {
        if (!globalThemes.hasOwnProperty(style)) {
            const parts = style.split('-')
            parts.pop()

            if (parts.length > 0) {
                return computeStyle({ ...campaign, style: parts.join('-') }, supportedThemes)
            }
            return 'base'
        }
        return style
    }
}

function loadTheme (themeName, supportedThemes, campaign) {
    const availableThemes = Object.keys(supportedThemes)

    let module = availableThemes.find(theme => theme === campaign.id)

    if (!module) {
        module = supportedThemes.hasOwnProperty(themeName) ? themeName : 'base'
    }

    return import(
        /*
            webpackInclude: /components\/(.+)\/themes\/(\w-?)+\.js$/,
            webpackExclude: /__supportedThemes.js$/,
            webpackChunkName: "themes",
            webpackMode: "lazy-once"
        */
        `components/${supportedThemes[module].replace(/^components\//, '')}`
        )
}
