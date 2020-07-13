// @flow
import React from 'react'
import { makeId } from '../Helpers'

import styles from './styles.module.scss'

type Props = {
    choices: [],
    defaultValue?: string,
    onChange: Function,
    labelFormat?: string => string,
    required: boolean
}

export default function RadioButtons (props: Props) {
    const id = React.useMemo(() => makeId('radioButton'), [])

    return (
        <div className={styles.buttons}>
            {props.choices.map(value => (
                <div className={styles.button} key={value}>
                    <input
                        id={`id-${value}`}
                        type="radio"
                        name={id}
                        defaultChecked={props.defaultValue === value}
                        onChange={e => {
                            if (e.target.checked) props.onChange(value)
                        }}
                        required={props.required}
                    />
                    <label htmlFor={`id-${value}`}>{ props.labelFormat ? props.labelFormat(value) : value }</label>
                </div>
            ))}

            <div className={styles.button}>
                <input
                    id={`${id}-other`}
                    type="radio"
                    checked={typeof props.value !== 'undefined' && !props.choices.includes(props.value)}
                    onChange={e => {
                        if (e.target.checked) props.onChange(0)
                    }}
                />
                <label htmlFor={`${id}-other`}>Other</label>
            </div>
        </div>
    )
}

RadioButtons.defaultProps = {
    required: true
}
