// @flow
import React from 'react'
import { makeId } from 'components/Form/Helpers'

import styles from './styles.module.scss'
import { ReactComponent as CheckMark } from './images/checkbox-mark.svg'

type Props = {
    disabled?: boolean,
    label: string,
    defaultChecked: boolean,
    onChange: boolean => void,
    disabled: boolean,
    required: boolean
};

export default function Checkbox (props: Props) {
    let id = React.useMemo(() => makeId('form-checkbox'), [])

    return (
        <div className={styles.checkbox}>
            <input
                id={id}
                type='checkbox'
                disabled={props.disabled || false}
                required={props.required || true}
                defaultChecked={props.defaultChecked}
                onChange={e => {
                    props.onChange(e.target.checked)
                }}
            />
            <label className={styles.widget} htmlFor={id}>
                <CheckMark/>
            </label>
            <label className={styles.label} htmlFor={id}>
                {props.label}
            </label>
        </div>
    )
}

Checkbox.defaultProps = {
    required: false,
    disabled: false
}
