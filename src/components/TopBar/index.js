// @flow
import React from 'react'
import { withTranslation } from 'react-i18next'
import styles from './styles.module.scss'
import withTheme from 'hoc/withTheme'
import supportedThemes from './themes/__supportedThemes.js'
import transDomain from './translations/index.translations'

const TopBar = ({
    theme
}) => {
    return (
        <div className={styles.container}>
            <img src={theme.logo} alt={'main logo'} className={styles.logo} />
        </div>
    )
}

export default withTranslation(transDomain)(withTheme(supportedThemes)(TopBar))
