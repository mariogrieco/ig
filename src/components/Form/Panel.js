// @flow
import React from 'react'
import cn from 'classnames'

import styles from './Panel.module.scss'

type Props = {
    children: React.Children,
    hidden: boolean
}

export default function Panel (props: Props) {
    return (<div className={cn(styles.panel, { [styles.isHidden]: props.hidden })}>{props.children}</div>)
}
