// @flow
import React from 'react'

import { withTranslation } from 'react-i18next'
import transDomain from './translations/index.translations'

import styles from './styles.module.scss'

function CampaignNotFound (props) {
    const { t } = props

    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.error404}>404</div>

                <div className={styles.title}>
                    {t('title')}
                </div>

                <div className={styles.description}>
                    {t('description')}
                </div>
            </div>
        </div>
    )
}

export default withTranslation(transDomain)(CampaignNotFound)
