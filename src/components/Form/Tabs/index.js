// @flow
import React from 'react'
import { makeId } from 'components/Form/Helpers'

import styles from './styles.module.scss'

type Props = {
    options: string[],
    labelFormat?: string,
    trans?: string => string,
    defaultValue?: string,
    onChange: string => void,
    required: boolean
}

export default function Tabs (props: Props) {
    const id = React.useMemo(() => makeId('tab'), [])

    return (
        <div className={styles.tabs}>
            {props.options.map(option => {
                let label = props.labelFormat.replace('%name%', option)
                label = props.trans
                    ? props.trans(label)
                    : label

                return (
                    <div className={styles.tab} key={option}>
                        <input
                            type="radio"
                            id={`${id}-${option}`}
                            name={id}
                            value={option}
                            defaultChecked={props.defaultValue === option}
                            onChange={event => {
                                if (event.target.checked) {
                                    props.onChange(option)
                                }
                            }}
                            required={props.required}
                        />
                        <label htmlFor={`${id}-${option}`}>{label}</label>
                    </div>
                )
            })}
        </div>
    )
}

Tabs.defaultProps = {
    required: true
}
