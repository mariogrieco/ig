import * as React from 'react'
import { useTranslation } from 'react-i18next'
import withTheme from 'hoc/withTheme'

import transDomain from './translations/index.translations'

import * as Form from 'components/Form'
import withForm from 'components/Form/Helpers/FormHOC'
import Steps from 'components/Steps'

import supportedThemes from './themes/__supportedThemes'

import styles from './styles.module.scss'

function Step4 ({ theme, values, isLoading, handleFieldChange }) {
    const { t } = useTranslation(transDomain)
    return (
        <>
            <Steps step={1} steps={3} description={<div><strong>Step 1 - </strong>Credit Card Information.</div>} />

            <Form.Row>
                <span className={styles.chekbox}>
                    <Form.Checkbox defaultChecked={values.sameAsContact} onChange={() => handleFieldChange('sameAsContact', !values.sameAsContact)} />
                    Same as contact address
                </span>
            </Form.Row>

            <Form.Row>
                <Form.Field
                    defaultValue={values.nameOnCard || null}
                    onChange={value => {
                        handleFieldChange('nameOnCard', value)
                    }}
                    type='text'
                    label={t('label.nameOnCard')}
                    placeholder={t('placeholder.nameOnCard')}
                />
            </Form.Row>

            <Form.Row>
                <Form.RowColumns>
                    <Form.RowColumn size={0.5}>
                        <Form.Field
                            defaultValue={values.creditCardNumber || null}
                            onChange={value => {
                                handleFieldChange('creditCardNumber', value)
                            }}
                            type='number'
                            label={t('label.creditCardNumber')}
                            placeholder={t('placeholder.creditCardNumber')}
                        />
                    </Form.RowColumn>
                    <Form.RowColumn size={0.5}>
                        <Form.Field label={t('label.cardType')}>
                            <Form.Dropdown
                                // error={errors.currentVehicleCondition || null}
                                placeholder={t('placeholder.cardType')}
                                options={['Visa']}
                                // optionFormat={'field.currentVehicleCondition.options.%name%'}
                                trans={t}
                                required={false}
                                onChange={value => {
                                // handleFieldChange('currentVehicleCondition', value)
                                }}
                                value={values.cardType}
                                defaultValue={values.cardType}
                            />
                        </Form.Field>
                    </Form.RowColumn>
                </Form.RowColumns>
            </Form.Row>

            <Form.Row>
                <Form.RowColumns>
                    <Form.RowColumn size={0.5}>
                        <Form.Field
                            defaultValue={values.cardExpiry || null}
                            onChange={value => {
                                handleFieldChange('cardExpiry', value)
                            }}
                            type='date'
                            label={t('label.cardExpiry')}
                            placeholder={t('placeholder.cardExpiry')}
                        />
                    </Form.RowColumn>
                    <Form.RowColumn size={0.5}>
                        <Form.Field
                            defaultValue={values.cvv || null}
                            onChange={value => {
                                handleFieldChange('cvv', value)
                            }}
                            type='number'
                            label={t('label.cvv')}
                            placeholder={t('placeholder.cvv')}
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

Step4.defaultProps = {
    values: {
        nameOnCard: null,
        creditCardNumber: null,
        cardType: null,
        cardExpiry: null,
        cvv: null
    }
}

export default withForm()(withTheme(supportedThemes)(Step4))
