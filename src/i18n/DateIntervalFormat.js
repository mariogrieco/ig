// @flow
import { addSeconds, formatDistanceStrict } from 'date-fns'

let referenceDate = new Date()
export function formatInterval (intervalInSeconds: number): string {
    return formatDistanceStrict(
        referenceDate,
        addSeconds(referenceDate, intervalInSeconds)
    )
}
