import * as React from 'react'
import withTheme from 'hoc/withTheme'

import withForm from 'components/Form/Helpers/FormHOC'

import supportedThemes from './themes/__supportedThemes'

import styles from './styles.module.scss'

function Success ({ theme, values, isLoading, state }) {
    const {firstName, lastName, donationAmount} = state
    return (
        <>
            <div className={styles.text}>
                Thank You {firstName} {lastName}. With Your {donationAmount} Donation, We Can Help Make Students’ Dreams Come True.
            </div>
        </>
    )
}

export default withForm()(withTheme(supportedThemes)(Success))
