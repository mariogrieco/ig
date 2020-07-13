// @flow

import * as React from 'react'
import cn from 'classnames'
import { Redirect } from 'react-router'
import { Trans, withTranslation } from 'react-i18next'
import queryString from 'query-string'

import { Store } from 'Store'
import { fetchLead } from 'Actions'

import withTheme from 'hoc/withTheme'
import type { Theme } from './themes/__supportedThemes'
import supportedThemes from './themes/__supportedThemes'
import transDomain from './translations/index.translations'

import styles from './styles.module.scss'

type Props = {
    theme: Theme
}

function RegistrationForm (props: Props) {
    const { t, theme } = props

    const loader = { '--color-loader': `url(${theme.loader})` }

    const [code, setCode] = React.useState(queryString.parse(window.location.hash)['code'] || '')
    const [isLoading, setIsLoading] = React.useState(false)
    const [invalidCode, setInvalidCode] = React.useState(false)

    const { state, dispatch } = React.useContext(Store)

    if (state.lead) {
        return <Redirect to={`${window.location.pathname}/step-1${window.location.search}`} push />
    }

    return (<form onSubmit={async e => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await fetchLead(dispatch, code)
            window.scrollTo(0, 0)
        } catch (err) {
            console.error(err)
            setInvalidCode(true)
            setIsLoading(false)
        }
    }}>
        <label htmlFor='code' style={{ color: theme.titleColor }}>
            <Trans i18nKey='label'>Enter your <strong> promo code </strong> to claim your voucher</Trans>
        </label>
        <span></span>
        <div className={styles.container}>
            <input
                type="text"
                placeholder={t('placeholder')}
                name="code"
                required
                style={theme.input}
                value={code}
                onChange={e => setCode(e.target.value)}
            />
            <button
                type="submit"
                style={{ ...theme.button, ...loader }}
                className={cn(styles.submit, { [styles.isLoading]: isLoading })}
                disabled={isLoading}
            >
                <span>{t('continue')}</span>
                <PlayButton />
            </button>
        </div>

        {
            invalidCode &&
            <div className={styles.invalidLabel}>
                <Trans i18nKey='wrongCode'>You have entered an invalid code</Trans>
            </div>
        }

    </form>)
}

const PlayButton = () => (
    <svg width="16px" height="19px" viewBox="0 0 16 19" x={-5}>
        <g id="UpgradeSale-Ford-NYNC-Website-Mobile" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="UpgradeSale-Ford-NYNC-Website-Mobile-HomepageCROPPED" transform="translate(-356.000000, -582.000000)" fill="#FFFFFF">
                <g id="REGISTRATION-FIELD" transform="translate(1.000000, 440.000000)">
                    <g id="FIELD" transform="translate(20.500000, 126.000000)">
                        <g id="BUTTON---Continue" transform="translate(316.500000, 2.000000)">
                            <path d="M27.3598547,16.9481764 L35.1031176,29.9894612 C35.3850804,30.4643459 35.2286863,31.077892 34.7538016,31.3598547 C34.5993032,31.4515882 34.4229426,31.5 34.2432629,31.5 L18.7567371,31.5 C18.2044524,31.5 17.7567371,31.0522847 17.7567371,30.5 C17.7567371,30.3203203 17.8051489,30.1439597 17.8968824,29.9894612 L25.6401453,16.9481764 C25.922108,16.4732917 26.5356541,16.3168977 27.0105388,16.5988604 C27.1543585,16.6842534 27.2744618,16.8043567 27.3598547,16.9481764 Z" id="Triangle" transform="translate(26.500000, 23.500000) rotate(-270.000000) translate(-26.500000, -23.500000) " />
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
)

export default withTranslation(transDomain)(withTheme(supportedThemes)(RegistrationForm))
