// @flow
const locale = document.documentElement.lang.replace('_', '-')

const OPTIONS = {
    date: {
        short: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        },
        medium: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        },
        long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        },
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    },
    time: {
        short: {
            hour: 'numeric',
            minute: 'numeric'
        },
        medium: {
            hour: 'numeric',
            minute: 'numeric',
            seconds: 'numeric'
        },
        long: {
            hour: 'numeric',
            minute: 'numeric',
            seconds: 'numeric',
            timeZoneName: 'short'
        },
        full: {
            hour: 'numeric',
            minute: 'numeric',
            seconds: 'numeric',
            timeZoneName: 'long'
        }
    }
}

const cache = {}

export type FormatType = 'long' | 'medium' | 'short';

export function formatDateTime (
    date: Date,
    dateFormat: FormatType = 'medium',
    timeFormat: ?FormatType = null,
) {
    if (!cache[dateFormat]) {
        cache[dateFormat] = {}
    }

    if (!cache[dateFormat][timeFormat]) {
        cache[dateFormat][timeFormat] = new Intl.DateTimeFormat(locale, {
            ...OPTIONS.date[dateFormat],
            ...OPTIONS.time[timeFormat]
        })
    }

    return cache[dateFormat][timeFormat].format(date)
}
