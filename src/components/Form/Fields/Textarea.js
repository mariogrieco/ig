// @flow
import * as React from 'react'
import Field from './Field'

type Props = {
  onChange?: (value: any) => void,
  disabled?: boolean,
  required?: boolean,
  rows?: number | string,
  cols?: number | string,
  placeholder?: string,
  label?: string
};

export default class Textarea extends React.Component<Props> {
  static defaultProps = {
      required: true
  };

  render () {
      return (
          <Field label={this.props.label}>
              <textarea
                  disabled={this.props.disabled}
                  onChange={e => this.props.onChange(e.currentTarget.value)}
                  required={this.props.required}
                  placeholder={this.props.placeholder}
                  rows={this.props.rows || 2}
                  cols={this.props.cols || 20}
              />
          </Field>
      )
  }
}
