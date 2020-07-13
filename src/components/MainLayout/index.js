// @flow
import * as React from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'

import withTheme from 'hoc/withTheme'
import themes from './themes/__supportedThemes.js'

export function LeftSide ({ children, className, title, style }) {
    return (
        <div className={cn(styles.leftSide, className)} style={style}>
            {children}
            {title && <span className={styles.title}>{title}</span>}
        </div>
    )
}

export function RigthSide ({ children, style, className }) {
    return (
        <div className={cn(styles.rightSide, className)} style={style}>
            <div>
                {children}
            </div>
        </div>
    )
}

export function BodyLayout ({
    children,
    className,
    style
}) {
    return (
        <div className={cn(styles.body, className)} style={style}>
            {children}
        </div>
    )
}

function MainLayout ({
    style,
    className,
    children
}) {
    return (
        <div
            className={cn(styles.container, className)}
            style={style}>
            {children}
        </div>
    )
}

export default withTheme(themes)(MainLayout)
