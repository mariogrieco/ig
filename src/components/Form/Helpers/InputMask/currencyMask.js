// @flow

import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Currency } from 'i18n/NumberFormatter'

export default function makeCurrencyMask (currency: string, locale: string) {
    const currencyFormatter = Currency(currency, locale)

    let parts = []
    try {
        parts = currencyFormatter.formatToParts(1234.56)
    } catch (err) {
        return currencyFallbackMask(currencyFormatter)
    }

    let mask = {}

    if (parts[0].type === 'currency') {
        mask.prefix = parts[0].value
        mask.suffix = ''
        parts = parts.slice(1)
    } else {
        mask.prefix = ''
        mask.suffix = '' + parts[parts.length - 1].value
    }

    if (parts[0].type === 'integer') {
        if (parts[1].type === 'group') {
            if (parts[1].value === ' ') {
                mask.includeThousandsSeparator = false
                mask.thousandsSeparatorSymbol = ''
            } else {
                mask.includeThousandsSeparator = true
                mask.thousandsSeparatorSymbol = parts[1].value
            }
        }
    }
    if (parts[2].type === 'integer') {
        if (parts[3].type === 'decimal') {
            mask.allowDecimal = true
            mask.decimalSymbol = parts[3].value
        }
    }

    return createNumberMask(mask)
}

/**
 * EN_US $1,234.56
 * FR_CA $1 234,56
 * EN_CA CA$1,234.56
 * @returns {*}
 */
function currencyFallbackMask (currencyFormatter) {
    let mask = {}
    let format = currencyFormatter.format(1234.56)

    if (format === '$1,234.56') {
        mask = {
            allowDecimal: true,
            decimalSymbol: '.',
            includeThousandsSeparator: true,
            prefix: '$',
            suffix: '',
            thousandsSeparatorSymbol: ','
        }
    }
    if (format === 'CA$1,234.56') {
        mask = {
            allowDecimal: true,
            decimalSymbol: '.',
            includeThousandsSeparator: true,
            prefix: 'CA$',
            suffix: '',
            thousandsSeparatorSymbol: ','
        }
    }
    if (format === '1 234,56 $') {
        mask = {
            allowDecimal: true,
            decimalSymbol: ',',
            includeThousandsSeparator: true,
            prefix: '',
            suffix: '$',
            thousandsSeparatorSymbol: ' '
        }
    }
    return createNumberMask(mask)
}
