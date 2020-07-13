// @flow
import React from 'react'
import cn from 'classnames'

import { makeId } from '../Helpers'

type Props = {
  required?: boolean,
  disabled?: boolean,
  value: ?string,
  label: ?string,
  placeholder: ?string,
  onChange: (e: SyntheticEvent) => void,
  size?: 'medium',
  accept: ?string
};

export default function Upload (props: Props) {
    const id = makeId('form-field')

    const handleChange = ({
        currentTarget
    }: SyntheticInputEvent<HTMLInputElement>) => {
        props.onChange(currentTarget)
    }

    const classes = { 'sh-form-field': true }

    if (props.size) {
        classes[`__size-${props.size}`] = true
    }

    const commonProps = {
        required: props.required || true,
        disabled: props.disabled,
        id: id,
        type: 'file',
        value: props.value || '',
        onChange: handleChange,
        placeholder: props.placeholder,
        accept: props.accept
    }

    const buildType = () => {
        return <input {...commonProps} />
    }

    return (
        <>
            {props.label ? (
                <label
                    disabled={props.disabled}
                    className='sh-form-field-label'
                    htmlFor={id}
                >
                    {props.label}
                </label>
            ) : null}

            <div className={cn(classes)}>{buildType()}</div>
        </>
    )
}
