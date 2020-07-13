// @flow
import React from 'react'
import cn from 'classnames'

import { makeId } from '../Helpers'

type Props = {
  disabled?: boolean,
  required?: boolean,
  type: string,
  value: ?string,
  label: ?string,
  placeholder: ?string,
  onChange: Function,
  size?: 'medium'
};

export default function Field (props: Props) {
    const id = makeId('form-field')

    const handleChange = ({
        currentTarget
    }: SyntheticInputEvent<HTMLInputElement>) => {
        props.onChange(currentTarget.value)
    }

    const classes = { 'sh-form-field': true }

    if (props.size) {
        classes[`__size-${props.size}`] = true
    }

    const commonProps = {
        disabled: props.disabled || false,
        requried: props.required || true
    }

    return (
        <React.Fragment>
            {props.label ? (
                <label className='sh-form-field-label' htmlFor={id}>
                    {props.label}
                </label>
            ) : null}

            <div className={cn(classes)}>
                <input
                    {...commonProps}
                    id={id}
                    type={props.type}
                    value={props.value || ''}
                    onChange={handleChange}
                    placeholder={props.placeholder}
                />
            </div>
        </React.Fragment>
    )
}

Field.defaultProps = {
    type: 'text'
}
