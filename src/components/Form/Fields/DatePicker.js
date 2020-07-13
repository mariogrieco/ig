// @flow
import * as React from 'react'
import DatePicker from './DatePicker'
import Field from './Field'

type Props = {
  onChange?: (e: SyntheticEvent) => void,
  required?: boolean,
  disabled?: boolean,
  min?: ?Date,
  max?: ?Date,
  value?: ?Date,
  label?: string
};

export default class FormDatePicker extends React.Component<Props> {
    static defaultProps = {
        required: true
    };

    render () {
        return (
            <Field label={this.props.label}>
                <DatePicker
                    required={this.props.required}
                    disabled={this.props.disabled}
                    min={this.props.min || new Date()}
                    max={this.props.max || null}
                    value={this.props.value || null}
                    onChange={this.props.onChange}
                />
            </Field>
        )
    }
}
