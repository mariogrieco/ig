// @flow
import queryString from 'query-string'
import merge from 'deepmerge'
import URL from 'url-parse'

import { Client, FetchClient, Lead, MockClient } from '@shift-marketing/shift-one-api-client'

import mockDataOverrides from 'mock-client-overrides.json'
import { utcToZonedTime } from 'date-fns-tz'

const query = queryString.parse(window.location.search)

function makeClient (baseUri: ?string): Client {
    if (typeof query['demo'] !== 'undefined') {
        let options = mockDataOverrides

        if (query['demo']) {
            try {
                const demo = JSON.parse(query['demo'])
                options = merge(options, demo)
            } catch (error) {
                throw new Error('Unable to parse JSON')
            }
        }
        return new MockClient('higher-education', options)
    }

    return new FetchClient(baseUri)
}

const APIClient = makeClient(process.env.REACT_APP_SHIFT_API_BASE_URL)

const campaignUrl = query._impersonate
    ? new URL(`${window.location.protocol}//${query._impersonate}`)
    : new URL(window.location.href)

export const fetchCampaign = (dispatch: any => void) => {
    (async function () {
        try {
            const campaign = await APIClient.getCampaign(campaignUrl)

            campaign.expiryDate = utcToZonedTime(new Date(campaign.expiryDate), campaign.timezone)

            dispatch({
                type: 'SET_CAMPAIGN',
                payload: campaign
            })

            dispatch({
                type: 'SET_LOCALE',
                payload: campaign.locales.default
            })
        } catch (error) {
            if (error.name === 'CampaignNotFoundError') {
                dispatch({ type: 'CAMPAIGN_NOT_FOUND' })
            }
        }
    })()
}

export const fetchLead = (dispatch: any => void) => {
    (async function () {
        const lead = await APIClient.getLead(campaignUrl)

        dispatch({
            type: 'SET_LEAD',
            payload: lead
        })
    })()
}

export async function updateLead (dispatch: any => void, code: ?string, lead: Lead) {
    const updatedLead = await APIClient.updateLead(campaignUrl, code, lead)

    dispatch({
        type: 'SET_LEAD',
        payload: updatedLead
    })

    if (lead.isComplete) {
        dispatch({ type: 'MARK_AUTORESPONDER_AS_PENDING' })
    }
}

export async function patchLead (dispatch: any => void, code: ?string, fields: any, isComplete: boolean) {
    const lead = await APIClient.patchLead(campaignUrl, code, fields, isComplete)

    dispatch({
        type: 'SET_LEAD',
        payload: lead
    })

    if (isComplete) {
        dispatch({ type: 'MARK_AUTORESPONDER_AS_PENDING' })
    }
}

export function deleteLead (dispatch: any => void) {
    dispatch({
        type: 'SET_LEAD',
        payload: null
    })
}

export async function sendAutoresponder (dispatch: any => void, voucherName: string, voucher: File) {
    dispatch({
        type: 'MARK_AUTORESPONDER_AS_SENT',
        payload: null
    })

    APIClient.sendAutoresponder(campaignUrl, { [voucherName]: voucher })
}

export async function sendAppointmentDate (dispatch: any => void, date: Date) {
    dispatch({
        type: 'CHAT_BOT_SET_APPOINTMENT_DATE',
        payload: date
    })

    APIClient.sendAppointmentDate(campaignUrl, date)
}

export async function sendClientMessage (dispatch: any => void, message: string) {
    dispatch({
        type: 'CHAT_BOT_SEND_CLIENT_MESSAGES',
        payload: message
    })

    APIClient.sendClientMessage(campaignUrl, message)
}
