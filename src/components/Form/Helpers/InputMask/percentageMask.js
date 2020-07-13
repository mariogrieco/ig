import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Currency } from 'i18n/NumberFormatter'
const currencyFormatter = Currency('CAD')

function maskFormatter () {
    let parts = []
    try {
        parts = currencyFormatter.formatToParts(1234.56)
    } catch (err) {
        return percentageFallbackMask()
    }

    let mask = {}

    if (parts[0].type === 'currency') {
        parts = parts.slice(1)
    }
    mask.prefix = ''
    mask.suffix = '%'

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

    mask.allowDecimal = true
    if (parts[2].type === 'integer') {
        if (parts[3].type === 'decimal') {
            mask.decimalSymbol = parts[3].value
        }
    }

    return createNumberMask(mask)
}

/**
 * EN_US $1,234.56
 * FR_CA 1 234,56 $
 * EN_CA CA$1,234.56
 * @returns {*}
 */
function percentageFallbackMask () {
    let mask = {
        allowDecimal: true,
        decimalSymbol: '.',
        includeThousandsSeparator: true,
        prefix: '',
        suffix: '%',
        thousandsSeparatorSymbol: ','
    }
    let format = currencyFormatter.format(1234.56)
    if (format === '1 234,56 $') {
        mask.allowDecimal = ','
        mask.thousandsSeparatorSymbol = ' '
    }
    return createNumberMask(mask)
}

export default maskFormatter()
