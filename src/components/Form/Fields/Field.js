// @flow
import React from 'react'
import cn from 'classnames'
import MaskedInput from 'react-text-mask'
import percentageMask from '../Helpers/InputMask/percentageMask'
import phoneMask from '../Helpers/InputMask/phoneMask'
import makeCurrencyMask from '../Helpers/InputMask/currencyMask'

import { makeId } from '../Helpers'
import Label from '../Label'

import { ParseNumber } from 'i18n/NumberFormatter'

import styles from './Field.module.scss'

type Props = {
    required?: boolean,
    disabled?: boolean,
    type?: string,
    name?: string,
    defaultValue?: ?string,
    value?: ?string,
    label: ?string,
    placeholder?: string,
    noBorder?: boolean,
    onChange?: (e: SyntheticEvent) => void,
    size?: 'medium',
    min?: number,
    max?: number,
    step?: number,
    locale?: string,
    currency?: string,
};

export default function Field (props: Props) {
    const [ isFocused, setIsFocused ] = React.useState(false)
    const id = React.useMemo(() => makeId('form-field'), [])

    const handleChange = ({ currentTarget }: SyntheticInputEvent<HTMLInputElement>) => {
        if (typeof props.onChange === 'function') { props.onChange(currentTarget.value) }
    }

    const wrapperClasses = cn(styles.wrapper, {
        [styles.error]: props.error,
        [styles.focused]: isFocused
    })
    const classes = { [styles.field]: true }

    if (props.size) {
        classes[`__size-${props.size}`] = true
    }

    let attr = {}

    if (props.type === 'range') {
        classes[styles.noBorder] = true
        attr['min'] = props.min || 0
        attr['max'] = props.max || 100
        attr['step'] = props.step
    }

    if (props.noBorder) {
        classes[styles.noBorder] = true
    }

    const controlProps = {
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false)
    }

    const commonProps = {
        ...controlProps,
        id: id,
        type: 'text',
        required: props.required,
        disabled: props.disabled,
        onChange: handleChange,
        placeholder: props.placeholder,
        ...attr
    }

    if (props.name) {
        commonProps.name = props.name
    }

    if (props.type === 'number') {
        commonProps.type = 'number'
        commonProps.onChange = ({ currentTarget }) => typeof props.onChange === 'function' && props.onChange(ParseNumber(props.locale, currentTarget.value))
    }

    if (typeof props.value !== 'undefined') {
        commonProps.value = props.value
    } else if (typeof props.defaultValue !== 'undefined') {
        commonProps.defaultValue = props.defaultValue
    }

    const buildType = () => {
        if (props.type) {
            if (props.type === 'email') {
                // commonProps.type = 'text'
                // return <MaskedInput
                //     mask={emailMask}
                //     guide={false}
                //     {...commonProps}
                // />
            }
            if (props.type === 'phone') {
                commonProps.type = 'text'
                return <MaskedInput
                    mask={phoneMask}
                    guide={false}
                    {...commonProps}
                />
            }
            if (props.type === 'currency') {
                commonProps.type = 'text'
                return <MaskedInput
                    mask={makeCurrencyMask(props.currency, props.locale)}
                    guide={false}
                    {...commonProps}
                    onChange={({ currentTarget }) => (
                        typeof props.onChange === 'function' && props.onChange(ParseNumber(props.locale, currentTarget.value))
                    )}
                />
            }
            if (props.type === 'percent') {
                commonProps.type = 'text'
                return <MaskedInput
                    mask={percentageMask}
                    guide={false}
                    {...commonProps}
                />
            }
            return <input {...commonProps} />
        }

        return React.cloneElement(props.children, controlProps)
    }

    return (
        <div className={wrapperClasses}>
            {props.label ? (
                <Label for={id}>{props.label}</Label>
            ) : null}

            <div className={cn(classes)}>{props.icon}{buildType()}</div>
        </div>
    )
}

Field.defaultProps = {
    required: true,
    noBorder: false
}
