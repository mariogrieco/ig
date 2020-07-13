// @flow
import React from 'react'
import { getDisplayName } from '../Helpers'
import FormComponent from '../index'

type Props = {
    initialValues?: { [field: string]: mixed },
    onSubmit?: (state: { [key: string]: mixed }) => void,
    onCancel?: () => void
};

type State = {
    values: { [string]: mixed },
    errors: { [string]: mixed },
    isSubmitting: boolean,
};

export default function withForm (loader?: boolean = true) {
    return function decorator (WrappedComponent: Class<React.Component>) {
        class Form extends React.Component<Props, State> {
            constructor (props: Props) {
                super(props)

                this.state = {
                    values: this.props.initialValues,
                    errors: null,
                    isSubmitting: false
                }
            }

            handleFieldChange = (key, value) => {
                this.setState({ values: { ...this.state.values, [key]: value } })

                if (key === 'reason') {
                    // force
                    window.dispatchEvent(new Event('resize'))
                }
            }

            handleSubmit = event => {
                event.preventDefault()

                if (loader) {
                    this.setState({ isSubmitting: true })
                }

                this.props.onSubmit(this.state.values, () => {
                    this.setState({ isSubmitting: false })
                })
            }

            render () {
                return (
                    <FormComponent
                        onClick={e => e.stopPropagation()}
                        onSubmit={this.handleSubmit}
                    >
                        <WrappedComponent
                            isLoading={this.state.isSubmitting}
                            handleFieldChange={this.handleFieldChange}
                            values={this.state.values}
                            {...this.props}
                        />
                    </FormComponent>
                )
            }
        }

        Form.displayName = `Form(${getDisplayName(WrappedComponent)})`
        return Form
    }
}

export type WithFormProps = {
    isLoading: boolean,
    handleFieldChange: (key: string, value: string) => void,
    values: {[string]: string}
}
