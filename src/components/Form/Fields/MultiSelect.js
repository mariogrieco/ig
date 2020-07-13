// @flow
import React from 'react'
import Choices from 'choices.js'

import './MultiSelect.module.scss'
import Field from './Field'

type Props = {
    values: string[],
    onChange: (values: string[]) => void,
    options: string[],
    label?: string
};

export default class MultiSelect extends React.PureComponent<Props> {
    select;
    choices;

    constructor (props) {
        super(props)

        this.select = React.createRef()
        this.choices = React.createRef()
    }

    componentDidMount () {
        this.choices = new Choices(this.select, {
            searchPlaceholderValue: 'searchPlaceholderValue',
            removeItemButton: true,
            placeholder: true,
            duplicateItemsAllowed: false
        })

        this.select.addEventListener('change', () => {
            this.props.onChange(this.choices.getValue(true))
        })
    }

    componentDidUpdate (prevProps: Props): void {
        if (this.props.values !== prevProps.values) {
            let currentValues = this.choices.getValue(true)
            for (let i = 0; i < currentValues.length; i++) {
                if (!this.props.values.includes(currentValues[i])) {
                    this.choices.removeActiveItemsByValue(currentValues[i])
                }
            }

            for (let i = 0; i < this.props.values.length; i++) {
                if (!currentValues.includes(this.props.values[i])) {
                    this.choices.setChoiceByValue(this.props.values[i])
                }
            }
        }
    }

    handleChange (a, b, c) {
        this.props.onChange && this.props.onChange(a, b, c)
    }

    renderOptions (data) {
        if (typeof data !== 'object') {
            throw Error('Argument must be an array or an object')
        }

        const options = []
        let index

        for (index in data) {
            if (!data.hasOwnProperty(index)) {
                continue
            }

            if (Array.isArray(data[index])) {
                options.push(
                    <optgroup key={index} label={index}>
                        {this.getOptions(data[index])}
                    </optgroup>
                )
            } else {
                options.push(
                    <option key={index} value={data[index]}>
                        {data[index]}
                    </option>
                )
            }
        }

        return options
    }

    render () {
        return (
            <Field label={this.props.label}>
                <select
                    multiple
                    ref={select => (this.select = select)}
                    defaultValue={this.props.values}
                >
                    <option value='' />
                    {this.renderOptions(this.props.options)}
                </select>
            </Field>
        )
    }
}
