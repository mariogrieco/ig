// @flow
const locale = document.documentElement.lang.replace('_', '-')

const getDecimalSeparator = (locale: string): string => (1.1).toLocaleString(locale).substring(1, 2)

export const Percent = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

export const makePercentFormatter = function (
    minimumFractionDigits,
    maximumFractionDigits
) {
    return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits
    })
}

const currencyFormatters = {}

export function Currency (currency: string, locale: string): Intl.NumberFormat {
    if (!currencyFormatters.hasOwnProperty(locale)) {
        currencyFormatters[locale] = {}
    }

    if (!currencyFormatters[locale].hasOwnProperty(currency)) {
        currencyFormatters[locale][currency] = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        })
    }

    return currencyFormatters[locale][currency]
}

export const Decimal = new Intl.NumberFormat(locale, {
    style: 'decimal'
})

export function ParseNumber (locale: string, value: string): number {
    const decimalSeparator = getDecimalSeparator(locale)
    const regex = new RegExp(`[^\\d\\${decimalSeparator}]`, 'g')
    value = value.replace(regex, '')
    value = value.replace(decimalSeparator, '.')

    return Number(value)
}
