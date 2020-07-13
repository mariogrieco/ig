import React from 'react'
import styles from './styles.module.scss'

import cn from 'classnames'

export default function SwitchSelector ({ children, options, selected, handleInputChange, required, value }) {
    return (
        <div className={styles.container}>
            <div className={styles.uidata}>
                {options.map(text => <div onClick={() => handleInputChange(text)} key={text} className={cn(styles.option, {
                    [styles.active]: selected === text
                })}>{text}</div>)}
            </div>
            <span className={styles.maskValidator}>
                <input required={required} value={selected} type="text" />
            </span>
        </div>
    )
}

SwitchSelector.defaultProps = {
    options: [], // max length 2,
    selected: null // 0 xor 1
}
