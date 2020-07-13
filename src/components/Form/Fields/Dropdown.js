// @flow
import React, { Component } from 'react'
import Select, { components } from 'react-select'

import styles from './Dropdown.module.scss'

type Props = {
    required?: boolean,
    disabled?: boolean,
    placeholder: ?string,
    options: Array<string> | { [value: string]: string },
    value?: string,
    defaultValue?: string,
    onChange: Function,
    trans?: string => string,
    optionFormat?: string
};

export default class Dropdown extends Component<Props> {
    static defaultProps = {
        required: true,
        disabled: false,
        placeholder: 'Select',
        optionFormat: '%name%'
    }

    constructor (props) {
        super(props)

        this.select = React.createRef()
    }

    get options (): { [string]: string } {
        if (!Array.isArray(this.props.options)) {
            return this.props.options
        }

        let options = {}

        this.props.options.forEach(item => {
            options[item] = this.formatOptionLabel(item)
        })

        return options
    }

    formatOptionLabel (label: string): string {
        label = this.props.optionFormat.replace('%name%', label)

        if (!this.props.trans) {
            return label
        }

        return this.props.trans(label)
    }

    render () {
        let {

            placeholder,

            value,
            defaultValue,
            onChange
        }: Props = this.props
        let options = this.options

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
            ...Object.keys(options).map(key => ({ value: key, label: options[key] }))
        ]

        return (
            <div className={styles.dropdown}>
                <Select
                    {...valueProp}
                    components={{ DropdownIndicator }}
                    className="sh-select__container"
                    classNamePrefix="sh-select"
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
                    onFocus={() => { this.select.current.select.controlRef.scrollIntoView({ behavior: 'smooth', block: 'center' }); this.select.current.focus() }}
                />
            </div>
        )
    }
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
