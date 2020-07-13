// @flow
import * as React from 'react'
import DateTimePicker from './DateTimePicker'
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

export default class FormDateTimePicker extends React.Component<Props> {
    static defaultProps = {
        required: true
    };

    render () {
        return (
            <Field label={this.props.label}>
                <DateTimePicker
                    required={this.props.required}
                    disabled={this.props.disabled}
                    min={this.props.min || null}
                    max={this.props.max || null}
                    value={this.props.value || null}
                    onChange={this.props.onChange}
                />
            </Field>
        )
    }
}
