// @flow
import queryString from 'query-string'

export default function usePromoCode () {
    return queryString.parse(window.location.search)['code'] || 'NOT_FOUND'
}
