// @flow
import * as React from 'react'

import { withTranslation } from 'react-i18next'
import withTheme from 'hoc/withTheme'
import { Store } from 'Store'
import styles from './styles.module.scss'
import supportedThemes from './themes/__supportedThemes.js'

import transDomain from './translations/index.translations'

type ImagePath = string;

type Props = {
    theme: {
        background: string,
        color: string,
        logo: ImagePath,
    }
}

const Footer = (props: Props) => {
    const { t, theme } = props
    const { state } = React.useContext(Store)
    const {
        postalCode,
        line1,
        city,
        province,
        country
    } = state.campaign.client.address
    const { phone } = state.campaign.client
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={theme.logo} alt='' />
            <div className={styles.innerContainer}>
                <p className={styles.disclaimer}>{t('disclaimer', {
                    line1: line1,
                    city: city,
                    province: province,
                    country: country,
                    postalCode: postalCode,
                    phone: phone
                })}</p>
            </div>
        </div>
    )
}

export default withTranslation(transDomain)(withTheme(supportedThemes)(Footer))
