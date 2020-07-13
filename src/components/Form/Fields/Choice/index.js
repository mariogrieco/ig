// @flow
import React from 'react'
import cn from 'classnames'
import { makeId } from '../../Helpers'

import styles from './styles.module.scss'

type Props = {
    type: 'checkbox' | 'radio',
    disabled?: boolean,
    label: string,
    value: string,
    name?: string,
    checked: boolean,
    onChange: string => void
};

export default function Choice (props: Props) {
    let id = makeId('form-checkbox')

    return (
        <div className={styles.choice}>
            <div className={cn(styles.widget)}>
                <input
                    id={id}
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    checked={props.checked}
                    onChange={event => props.onChange(event.target.value)}
                />
                <label htmlFor={id}/>
            </div>
            <label className={styles.label} htmlFor={id}>{props.label}</label>
        </div>
    )
}
