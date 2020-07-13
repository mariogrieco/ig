// @flow
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'util/polyfills/element-remove.js'

import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
import 'normalize.css'
import './index.css'
import App from './App'
import { StoreProvider } from './Store'
import './i18n.js'

// TODO: Separate translations into each component => https://stackoverflow.com/a/53433779/3173518

if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN })
}

document.documentElement.style.scrollBehavior = 'smooth'

if (window.location.search === '?trigger=error') {
    throw new Error('triggered')
}

ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById('root')
)
