import * as React from 'react'
import { useTranslation } from 'react-i18next'
import withTheme from 'hoc/withTheme'

import transDomain from './translations/index.translations'

import * as Form from 'components/Form'
import withForm from 'components/Form/Helpers/FormHOC'
import Steps from 'components/Steps'

import supportedThemes from './themes/__supportedThemes'

import styles from './styles.module.scss'

function Step6 ({ theme, values, isLoading }) {
    const { t } = useTranslation(transDomain)
    const {
        billingZipCode,
        billingState,
        billingCity,
        donationAmount,
        nameOnCard,
        creditCardNumber,
        cardType,
        cvv,
        cardExpiry,
        billingAddress,
        billingSuiteAptNum
    } = values
    return (
        <>
            <Steps step={3} steps={3} description={<div><strong>Step 3 - </strong>Donation Review.</div>} />
            <Form.Row>
                <div className={styles.donation}>
                    <div className={styles.donationTitle}>Donation Amount</div>
                    <span className={styles.donationAmount}>${donationAmount}</span>
                </div>
            </Form.Row>

            <Form.Row>
                <Form.RowColumns>
                    <Form.RowColumn size={0.5}>
                        <div className={styles.donationSummary}>
                            <div className={styles.summaryTitle}>Payment Method</div>
                            <div className={styles.summaryList}>
                                <div className={styles.summaryItem}>{nameOnCard}</div>
                                <div className={styles.summaryItem}>{cardType}</div>
                                <div className={styles.summaryItem}>{creditCardNumber}</div>
                                <div className={styles.summaryItem}>{cardExpiry}</div>
                                <div className={styles.summaryItem}>{cvv}</div>
                            </div>
                        </div>

                    </Form.RowColumn>

                    <Form.RowColumn size={0.5}>
                        <div className={styles.donationSummary}>
                            <div className={styles.summaryTitle}>Billing Address</div>
                            <div className={styles.summaryList}>
                                <div className={styles.summaryItem}>{billingAddress} </div>
                                <div className={styles.summaryItem}>#{billingSuiteAptNum}</div>
                                <div className={styles.summaryItem}>{billingCity}</div>
                                <div className={styles.summaryItem}>{billingState}</div>
                                <div className={styles.summaryItem}>{billingZipCode} </div>
                            </div>
                        </div>
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

Step6.defaultProps = {
    values: {
        nameOnCard: null,
        creditCardNumber: null,
        cardType: null,
        cardExpiry: null,
        cvv: null
    }
}

export default withForm()(withTheme(supportedThemes)(Step6))
