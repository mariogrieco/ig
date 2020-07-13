import * as React from 'react'
import { useTranslation } from 'react-i18next'
import withTheme from 'hoc/withTheme'

import transDomain from './translations/index.translations'

import * as Form from 'components/Form'
import withForm from 'components/Form/Helpers/FormHOC'
import Steps from 'components/Steps'

import supportedThemes from './themes/__supportedThemes'

function Step1 ({ theme, values, isLoading, handleFieldChange }) {
    const { t } = useTranslation(transDomain)
    return (
        <>
            <Steps step={2} steps={3} description={t('description')} title={''} />
            <Form.Row>
                <Form.RowColumns>
                    <Form.RowColumn size={0.7}>
                        <Form.Field
                            defaultValue={values.addres || null}
                            onChange={value => {
                                handleFieldChange('addres', value)
                            }}
                            type='text'
                            label={t('label.address')}
                            placeholder={t('placeholder.adress')}
                        />
                    </Form.RowColumn>
                    <Form.RowColumn size={0.3}>
                        <Form.Field
                            defaultValue={values.suiteAptNum || null}
                            onChange={value => {
                                handleFieldChange('suiteAptNum', value)
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
                    defaultValue={values.city || null}
                    onChange={value => {
                        handleFieldChange('city', value)
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
                            defaultValue={values.state}
                            onChange={value => {
                                handleFieldChange('state', value)
                            }}
                            type='text'
                            required={false}
                         />
                    </Form.RowColumn>
                    <Form.RowColumn size={0.3}>
                        <Form.Field
                            defaultValue={values.zip || null}
                            onChange={value => {
                                handleFieldChange('zip', value)
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
                    label={t('label.continueToStep2')}
                    style={{ background: theme.background, color: theme.color, marginTop: '1.62em' }}
                />
            </Form.Row>
        </>
    )
}

Step1.defaultProps = {
    values: {
        addres: null,
        zip: null,
        city: null,
        state: null,
        suiteAptNum: null
    }
}

export default withForm()(withTheme(supportedThemes)(Step1))
