// @flow
import React from 'react'
import i18n from 'i18n'

export const Store = React.createContext()

const initialState = {
    locale: null,
    currency: null,
    campaign: null,
    lead: null,
    errors: {},
    autoresponderShouldBeSent: false,
}

function reducer (state, action) {
    switch (action.type) {
        case 'SET_LOCALE':
            const currency = action.payload.split('-')[1] === 'US' ? 'USD' : 'CAD'
            i18n.changeLanguage(action.payload).then()
            return { ...state, locale: action.payload, currency: currency }
        case 'SET_CAMPAIGN':
            return { ...state, campaign: action.payload }
        case 'SET_LEAD':
            return { ...state, lead: action.payload }
        case 'SET_CODE':
            return { ...state, code: action.payload }
        case 'CAMPAIGN_NOT_FOUND':
            return {
                ...state,
                errors: {
                    ...(state.errors || {}),
                    campaignNotFound: true
                }
            }
        case 'MARK_AUTORESPONDER_AS_PENDING':
            return {
                ...state,
                autoresponderShouldBeSent: state.campaign.hasOwnProperty('autoresponder')
            }
        case 'CHAT_BOT_SET_STEP':
            return {
                ...state,
                chatBot: {
                    ...state.chatBot,
                    currentStep: action.payload
                }
            }
        case 'CHAT_BOT_SET_APPOINTMENT_DATE':
            return {
                ...state,
                chatBot: {
                    ...state.chatBot,
                    appointmentDate: action.payload
                }
            }
        case 'CHAT_BOT_SEND_CLIENT_MESSAGES':
            return {
                ...state,
                chatBot: {
                    ...state.chatBot,
                    clientMessages: [...state.chatBot.clientMessages, action.payload]
                }
            }
        case 'MARK_AUTORESPONDER_AS_SENT':
            return { ...state, autoresponderShouldBeSent: false }
        default:
            throw new Error(`Action of type "${action.type}" is not defined`)
    }
}

export function StoreProvider (props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = { state, dispatch }

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
