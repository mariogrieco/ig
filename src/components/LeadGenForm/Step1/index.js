// @flow
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import withTheme from 'hoc/withTheme'

import transDomain from './translations/index.translations'

import * as Form from 'components/Form'
import withForm, { WithFormProps } from 'components/Form/Helpers/FormHOC'
import Steps from 'components/Steps'

import supportedThemes from './themes/__supportedThemes'

type Props = WithFormProps | {
    values: {
        firstName: ?string,
        lastName: ?string,
        email: ?string,
        phoneNumber: ?string
    }
}

function Step1 (props: Props) {
    const { theme } = props
    const { t } = useTranslation(transDomain)
    return (
        <>
            <Steps step={1} steps={3} description={t('description')} />
            <Form.Row>
                <Form.RowColumns>
                    <Form.RowColumn>
                        <Form.Field
                            // error={props.errors.firstName || null}
                            defaultValue={props.values.firstName || null}
                            onChange={value => {
                                props.handleFieldChange('firstName', value)
                            }}
                            type='text'
                            label={t('label.firstName')}
                            placeholder={t('placeholder.firstName')}
                        />
                    </Form.RowColumn>
                    <Form.RowColumn>
                        <Form.Field
                            // error={props.errors.lastName || null}
                            defaultValue={props.values.lastName || null}
                            onChange={value => {
                                props.handleFieldChange('lastName', value)
                            }}
                            type='text'
                            label={t('label.lastName')}
                            placeholder={t('placeholder.lastName')}
                        />
                    </Form.RowColumn>
                </Form.RowColumns>
            </Form.Row>

            <Form.Row>
                <Form.Field
                    // error={props.errors.email || null}
                    defaultValue={props.values.email || null}
                    onChange={value => {
                        props.handleFieldChange('email', value)
                    }}
                    type='email'
                    label={t('label.emailAddress')}
                    placeholder={t('placeholder.emailAddress')}
                />
            </Form.Row>

            <Form.Row>
                <Form.RowColumns>
                    <Form.RowColumn>
                        <Form.Field
                            // error={props.errors.eveningPhone || null}
                            defaultValue={props.values.phoneNumber || null}
                            onChange={value => {
                                props.handleFieldChange('phoneNumber', value)
                            }}
                            type='phone'
                            label={t('label.phoneNumber')}
                            placeholder={t('placeholder.phoneNumber')}
                            required={false}
                        />
                    </Form.RowColumn>
                </Form.RowColumns>
            </Form.Row>

            <Form.Row>
                <Form.Submit
                    isLoading={props.isLoading}
                    label={t('label.continueToStep2')}
                    style={{ background: theme.background, color: theme.color, marginTop: '1.62em' }}
                />
            </Form.Row>
        </>
    )
}

Step1.defaultProps = {
    values: {
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null
    }
}

export default withForm()(withTheme(supportedThemes)(Step1))
