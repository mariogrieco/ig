// @flow
import React from 'react'
import cn from 'classnames'
import { makeId } from '../Helpers'

type Props = {
  required?: boolean,
  disabled?: boolean,
  label: string,
  value: string,
  checked: boolean,
  onChange: Function,
  size?: 'medium'
};

export default function Radio (props: Props) {
    let id = makeId('form-radio')

    let classes = { 'sh-form-radio': true }
    if (props.size) {
        classes[`__size-${props.size}`] = true
    }

    const commonProps = {
        disabled: props.disabled || false,
        required: props.required || true
    }

    return (
        <div className={cn(classes)}>
            <div className='sh-form-radio-widget'>
                <input
                    {...commonProps}
                    id={id}
                    type='radio'
                    value={props.value}
                    onChange={event => props.onChange(event.target.value)}
                    checked={props.checked}
                />
                <label {...commonProps} htmlFor={id} />
            </div>
            <label {...commonProps} className='sh-form-choice-label' htmlFor={id}>
                {props.label}
            </label>
        </div>
    )
}
