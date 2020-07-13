// @flow
import React from 'react'
import cn from 'classnames'

import styles from './Label.module.scss'

type Props = {
    children: React.Children,
    for?: string,
    isFloating: boolean
}

export default function Label (props: Props) {
    return (
        <label className={cn(styles.label, {[styles.isFloating]: props.isFloating})} htmlFor={props.for}>{props.children}</label>
    )
}

Label.defaultProps = {
    isFloating: false
}
