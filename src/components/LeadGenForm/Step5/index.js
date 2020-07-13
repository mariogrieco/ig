import * as React from 'react'
import { useTranslation } from 'react-i18next'
import withTheme from 'hoc/withTheme'

import transDomain from './translations/index.translations'

import * as Form from 'components/Form'
import withForm from 'components/Form/Helpers/FormHOC'
import Steps from 'components/Steps'

import supportedThemes from './themes/__supportedThemes'

function Step5 ({ theme, values, isLoading, handleFieldChange }) {
    const { t } = useTranslation(transDomain)
    return (
        <>
            <Steps step={2} steps={3} description={<div><strong>Step 2 - </strong>Billing Address.</div>} />
            <Form.Row>
                <Form.RowColumns>
                    <Form.RowColumn size={0.7}>
                        <Form.Field
                            defaultValue={values.billingAddress || null}
                            onChange={value => {
                                handleFieldChange('billingAddress', value)
                            }}
                            type='text'
                            label={t('label.address')}
                            placeholder={t('placeholder.adress')}
                        />
                    </Form.RowColumn>
                    <Form.RowColumn size={0.3}>
                        <Form.Field
                            defaultValue={values.billingSuiteAptNum || null}
                            onChange={value => {
                                handleFieldChange('billingSuiteAptNum', value)
                            }}
                            type='number'
                            label={t('label.suiteAptNum')}
                            placeholder={t('placeholder.suiteAptNum')}
                        />
                    </Form.RowColumn>
                </Form.RowColumns>
            </Form.Row>

            <Form.Row>
                <Form.Field
                    defaultValue={values.billingCity || null}
                    onChange={value => {
                        handleFieldChange('billingCity', value)
                    }}
                    type='text'
                    label={t('label.city')}
                    placeholder={t('placeholder.city')}
                />
            </Form.Row>

            <Form.Row>
                <Form.RowColumns>
                    <Form.RowColumn size={0.7}>
                        <Form.Field
                            label={t('label.state')}
                            placeholder={t('placeholder.state')}
                            defaultValue={values.billingState}
                            onChange={value => {
                                handleFieldChange('billingState', value)
                            }}
                            type='text'
                            required={false}
                         />
                    </Form.RowColumn>
                    <Form.RowColumn size={0.3}>
                        <Form.Field
                            defaultValue={values.billingZipCode || null}
                            onChange={value => {
                                handleFieldChange('billingZipCode', value)
                            }}
                            type='number'
                            label={t('label.zip')}
                            placeholder={t('placeholder.zip')}
                        />
                    </Form.RowColumn>
                </Form.RowColumns>
            </Form.Row>

            <Form.Row>
                <Form.Submit
                    isLoading={isLoading}
                    label={t('label.continue')}
                    style={{ background: theme.background, color: theme.color, marginTop: '1.62em' }}
                />
            </Form.Row>
        </>
    )
}

Step5.defaultProps = {
    values: {
        billingAddress: null,
        billingSuiteAptNum: null,
        billingCity: null,
        billingState: null,
        billingZipCode: null
    }
}

export default withForm()(withTheme(supportedThemes)(Step5))
