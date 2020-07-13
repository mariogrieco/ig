// @flow
import React, { Component } from 'react'
import Select, { components } from 'react-select'

import styles from './Dropdown.module.scss'

const CLASS_NAME_PREFIX = 'sh-select'

type Props = {
    required?: boolean,
    disabled?: boolean,
    placeholder: ?string,
    options: Array<string> | { [value: string]: string },
    value?: string,
    defaultValue?: string,
    onChange: Function,
    trans?: string => string,
};

export default class ModelPickerDropdown extends Component<Props> {
    static defaultProps = {
        required: true,
        disabled: false,
        placeholder: 'Select'
    }

    constructor (props) {
        super(props)

        this.select = React.createRef()
    }

    render () {
        let {

            placeholder,

            value,
            defaultValue,
            onChange
        }: Props = this.props

        let valueProp
        if (value) {
            valueProp = { value }
        } else {
            if (defaultValue) {
                valueProp = { defaultValue }
            } else {
                valueProp = { value: '' }
            }
        }

        const selectOptions = [
            placeholder ? { value: '', label: placeholder } : {},
            ...this.props.options.map(key => ({ value: key.value, label: key.label, segment: key.segment, voucherValue: key.voucherValue }))
        ]

        return (
            <div className={styles.dropdown}>
                <Select
                    {...valueProp}
                    components={{ DropdownIndicator, Option: OptionWithVoucherValue }}
                    className="sh-select__container"
                    classNamePrefix={CLASS_NAME_PREFIX}
                    ref={this.select}
                    placeholder={placeholder || null}
                    required={this.props.required}
                    isDisabled={this.props.disabled}
                    isSearchable={false}
                    onFocus={this.props.onFocus || null}
                    onBlur={this.props.onBlur || null}
                    options={selectOptions}
                    onChange={selectedOption => onChange(selectedOption.value)}
                    defaultValue={selectOptions.find(op => op.value === this.props.defaultValue) || null}
                />
                <input
                    tabIndex={-1}
                    value={this.props.value || this.props.defaultValue}
                    required={this.props.required}
                    onChange={selectedOption => onChange(selectedOption.value)}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: 'transparent',
                        border: 0,
                        pointerEvents: 'none',
                        color: 'transparent',
                        textIndent: '-9999px'
                    }}
                    onFocus={() => this.select.current.focus()}
                />
            </div>
        )
    }
}

const OptionWithVoucherValue = (props) => {
    return (
        <div className="sh-select__option-container">
            <components.Option {...props} />
            { props.data.voucherValue &&
                <div className="sh-select__vehicle-voucher-value">
                    {`$${props.data.voucherValue}` /* TODO: useMemo with currencyFormatter */}
                </div>
            }
        </div>
    )
}

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <ArrowDown width={`${14 / 16}em`} height={`${10 / 16}em`} />
        </components.DropdownIndicator>
    )
}

const ArrowDown = ({ width, height, color }) => (
    <svg width={width || '14px'} height={height || '10px'} viewBox="0 0 14 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon stroke={color || '#C4C4C4'} transform="translate(7.000000, 5.500000) scale(1, -1) translate(-7.000000, -5.500000) " points="7 1 13 10 1 10"></polygon>
        </g>
    </svg>
)
