import * as React from 'react'
import { useTranslation } from 'react-i18next'
import withTheme from 'hoc/withTheme'

import transDomain from './translations/index.translations'

import * as Form from 'components/Form'
import withForm from 'components/Form/Helpers/FormHOC'
import Steps from 'components/Steps'
import DonateOption from 'components/DonateOption'
import SwitchSelector from 'components/SwitchSelector'
import ModalContainer from 'components/ModalContainer'

import messageImage from './images/messageImage.jpg'

import supportedThemes from './themes/__supportedThemes'
import icon from './images/TriangleIcon.svg'

import styles from './styles.module.scss'

function Step3 ({ theme, values, isLoading, byEmail, byPhone, toStep1, toEmail, toPhone, handleFieldChange }) {
    const [show, setShow] = React.useState(byEmail || byPhone)
    const { t } = useTranslation(transDomain)
    return (
        <>
            <ModalContainer show={show} onClickOverlay={() => setShow(true)}>
                {byPhone &&
                    <div className={styles.infoContainer} style={{ backgroundImage: `url(${messageImage})` }}>
                        <p className={styles.infoTitle}>Phone Call Donation</p>
                        <div className={styles.infoBody}>
                            <p>{t('byPhone.title')}</p>
                            <span>{t('byPhone.thanksMessage')}</span>
                        </div>
                        <span onClick={toStep1}>
                            <Form.Submit
                                isSubmit={false}
                                isLoading={isLoading}
                                label={t('label.continue')}
                                style={{ background: theme.background, color: theme.color, marginTop: '1.62em' }}
                        />
                        </span>
                        <div className={styles.infoMessage} onClick={toEmail}>{t('byEmail.alternative')}</div>
                    </div>
                }
                {byEmail &&
                    <div className={styles.infoContainer} style={{ backgroundImage: `url(${messageImage})` }}>
                        <p className={styles.infoTitle}>Donate By Mail</p>
                        <div className={styles.infoBody}>
                            <p>{t('byPhone.title')}</p>
                            <span>{t('byPhone.thanksMessage')}</span>
                        </div>
                        <span onClick={toStep1}>
                            <Form.Submit
                                isSubmit={false}
                                isLoading={isLoading}
                                label={t('label.continue')}
                                style={{ background: theme.background, color: theme.color, marginTop: '1.62em' }}
                        />
                        </span>
                        <div className={styles.infoMessage} onClick={toPhone}>{t('byPhone.alternative')}</div>
                    </div>
                }
            </ModalContainer>

            <Steps step={3} steps={3} description={'Select the amount you wish to donate.'} title={''} />

            <SwitchSelector
                selected={values.donationType}
                options={['One-Time Gift', 'Monthly Gift']}
                required
                handleInputChange={value => handleFieldChange('donationType', value)}
            />

            <span className={styles.message}>A one time donation will be made through your credit card.</span>

            <div className={styles.gridContainer}>
                <div className={styles.row}>
                    <DonateOption center small title='$1,000' onClick={() => handleFieldChange('donationAmount', '1000')} active={values.donationAmount === '1000'} />
                    <DonateOption center small title='$500' onClick={() => handleFieldChange('donationAmount', '500')} active={values.donationAmount === '500'} />
                    <DonateOption center small title='$250' onClick={() => handleFieldChange('donationAmount', '250')} active={values.donationAmount === '250'} />
                </div>
                <div className={styles.row}>
                    <DonateOption center small title='$100' onClick={() => handleFieldChange('donationAmount', '100')} active={values.donationAmount === '100'} />
                    <DonateOption center small title='$50' onClick={() => handleFieldChange('donationAmount', '50')} active={values.donationAmount === '50'} />
                    <DonateOption center small title='$25' onClick={() => handleFieldChange('donationAmount', '25')} active={values.donationAmount === '25'} />
                </div>
            </div>

            <Form.Row>
                <Form.Field
                    defaultValue={values.donationAmount || null}
                    onChange={value => {
                        handleFieldChange('donationAmount', `${value}`)
                    }}
                    type='text'
                    label={t('label.amount')}
                    placeholder={t('placeholder.amount')}
                    icon={<button type='submit' className={styles.icon} style={{
                        backgroundImage: `url(${icon})`
                    }}></button>}
                />
            </Form.Row>
        </>
    )
}

Step3.defaultProps = {
    values: {
        addres: null,
        lastName: null,
        city: null,
        stte: null
    }
}

export default withForm()(withTheme(supportedThemes)(Step3))
