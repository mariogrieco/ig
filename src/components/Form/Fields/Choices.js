// @flow
import React from 'react'
import Choice from './Choice'
import { RowColumn, RowColumns } from '../index'
import { makeId } from 'components/Form/Helpers'

import styles from '../styles.module.scss'

type Props = {
    choices: string[],
    value: string | string[],
    disabled?: boolean,
    required?: boolean,
    multiple: boolean,
    onChange: Function,
    maxChoices?: number,
    formatLabel: string => string,
    vertical: boolean,
    columns?: number
};

export default function Choices (props: Props) {
    const name = makeId('choices-')

    const handleChange = (value: string) => {
        if (!props.multiple) {
            props.onChange(value)
            return
        }

        let values: string[] = props.value || []
        let index = values.indexOf(value)
        if (index === -1) {
            if (props.maxChoices !== null) {
                const totalSelected = values.reduce((acc, curr) => acc + (curr !== null ? 1 : 0), 0)

                if (props.maxChoices && totalSelected >= props.maxChoices) {
                    const latest = values.indexOf(values.filter(Boolean).pop())
                    values.splice(latest, 1)
                }
            }

            values.push(value)
        } else {
            values.splice(index, 1)
        }

        props.onChange(values)
    }

    let choices = props.choices.map(choice => {
        return (
            <Choice
                type={props.multiple ? 'checkbox' : 'radio'}
                key={choice}
                name={name}
                label={props.formatLabel(choice)}
                value={choice}
                required={props.required}
                disabled={props.disabled}
                checked={props.multiple ? props.value && props.value.indexOf(choice) !== -1 : props.value === choice}
                onChange={handleChange}
            />
        )
    })

    return (
        <RowColumns className={styles.choicesRowColumns}>
            {choices.map((choice, index) => (
                <RowColumn key={index} size={props.columns ? 1 / props.columns : null}>{choice}</RowColumn>
            ))}
            <input
                tabIndex={-1}
                value={props.value}
                onChange={() => null}
                required={props.required}
                style={{
                    opacity: 0,
                    width: 0,
                    height: 0,
                    position: 'absolute',
                    bottom: 0
                }}
            />
        </RowColumns>
    )
}

Choices.defaultProps = {
    disabled: false,
    required: true,
    value: [],
    formatLabel: '%name%',
    vertical: false,
    maxChoices: null
}
