// @flow
import * as React from 'react'

type Props = {
  onCancel?: (e: SyntheticEvent) => void,
  isLoading?: boolean,
  cancelLabel?: string,
  label?: string,
  color?: string,
  size?: string
};

export default class FormSubmit extends React.Component<Props> {
  static defaultProps = {
      isLoading: false,
      color: 'primary',
      size: 'medium',
      cancel: 'Cancel',
      submit: 'Submit'
  };

  render () {
      return (
          <>
              <button disabled={this.props.isLoading} color='primary' size='medium'>
                  {this.props.label}
              </button>

              {this.props.onCancel && (
                  <button
                      disabled={this.props.isLoading}
                      link
                      color='danger'
                      size='medium'
                      onClick={this.props.onCancel}
                  >
                      {this.props.cancelLabel}
                  </button>
              )}
          </>
      )
  }
}
