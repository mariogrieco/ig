// @flow
import * as React from 'react'

import withTheme from 'hoc/withTheme'
import themes from './themes/__supportedThemes.js'

function ThemeWrapper (props) {
    const { theme } = props

    return (
        <div className={props.className} style={{ ...theme.style, ...props.style }}>
            {props.children}
        </div>
    )
}

export default withTheme(themes)(ThemeWrapper)
