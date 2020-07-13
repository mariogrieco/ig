// @flow
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Store } from 'Store'
import withTheme from 'hoc/withTheme'
import StepLayout from 'components/StepLayout'
import Countdown from 'components/Countdown'
import AbsoluteTime from 'components/AbsoluteTime'
import transDomain from './translations/index.translations'

import * as Form from 'components/Form'
import withForm from 'components/Form/Helpers/FormHOC'

import styles from './styles.module.scss'

import supportedThemes from './themes/__supportedThemes'

Landing.defaultProps = {
    date: new Date()
}

function Landing (props: Props) {
    const { theme } = props
    const { t } = useTranslation(transDomain)
    const { state } = React.useContext(Store)
    return (
        <StepLayout>
            <div className={styles.expiryText}>
                <span>{t('event_expiry')} &nbsp; <AbsoluteTime dateFormat='long' date={props.date} /></span>
                <Countdown date={state.campaign.expiryDate} />
            </div>
            <h2>{state.lead.fields.firstName}, Thank You for Being a Part of Their Story.</h2>
            <p>Support from alumni, community and corporate sponsors have provided countless opportunities for our students to thrive.</p>
            <Form.Submit
                isLoading={props.isLoading}
                label={t('continueToStep2')}
                style={{ background: theme.background, color: theme.color, marginTop: '1.62em' }}
            />
        </StepLayout>
    )
}

export default withForm()(withTheme(supportedThemes)(Landing))
