// @flow
import React from 'react'
import { formatDateTime, FormatType } from 'i18n/DateFormat'

export default function AbsoluteTime (props: {
    style?: Object,
    className?: string,
    date: Date,
    dateFormat?: FormatType,
    timeFormat?: FormatType,
    noContainer?: boolean,
}) {
    try {
        const date = formatDateTime(props.date, props.dateFormat, props.timeFormat)

        return (
            props.noContainer ? <>{date}</> : <span className={props.className} style={props.style}>{date}</span>
        )
    } catch (err) {
        console.error(err)
        return (<span>[[ ERROR ]]</span>)
    }
}
