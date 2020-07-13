// @flow
import React from 'react'
import cn from 'classnames'
import { Trans, useTranslation } from 'react-i18next'
import { patchLead } from 'Actions'
import { Store } from 'Store'

import withTheme from 'hoc/withTheme'
import * as Form from 'components/Form'

import transDomain from './translations/index.translations'
import supportedThemes from './themes/__supportedThemes'

import styles from './styles.module.scss'

function UpdateEmailForm (props) {
    const { t } = useTranslation(transDomain)
    const { state, dispatch } = React.useContext(Store)
    const [ isUpdating, setIsUpdating ] = React.useState(false)

    const changeEmailAddress = (e) => {
        e.preventDefault()
        setIsUpdating(true)
    }

    const handleSubmit = React.useCallback(async (e) => {
        e.preventDefault()

        await patchLead(dispatch, state.code, { email: e.target.elements['email'].value }, true)
        setIsUpdating(false)
    }, [dispatch, state.code])

    return (
        <form onSubmit={handleSubmit}>
            <p>{t('heading')}</p>

            <div className={styles.fieldWrapper}>
                <Form.Field disabled={!isUpdating} defaultValue={state.lead.fields.email} type='text' name='email'/>

                <button
                    type="submit"
                    style={{ background: props.theme.primary }}
                    className={cn({ [styles.isActive]: isUpdating })}
                >{t('button.label')}</button>
            </div>

            <p className={styles.smallPrint}>
                <Trans i18nKey="change_email">
                    Not the correct email address?
                    <a href="/" onClick={changeEmailAddress} style={{ color: props.theme.primary }}>Click Here</a> to change.
                </Trans>
            </p>
        </form>
    )
}

export default withTheme(supportedThemes)(UpdateEmailForm)
