import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ICU from 'i18next-icu'

i18n
    .use(ICU) // enable ICU message format
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {},
        lng: 'en',

        keySeparator: false,

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })

export default i18n
