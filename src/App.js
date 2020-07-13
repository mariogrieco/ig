// @flow

import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Store } from 'Store'
import { fetchCampaign, fetchLead } from 'Actions'

import BaseLayout from 'components/MainLayout'
import Footer from 'components/Footer'
import TopBar from 'components/TopBar'
import CampaignNotFound from 'components/CampaignNotFound'

import Landing from 'pages/Landing'
import MakeADonation from 'pages/MakeADonation'

import Step1 from 'pages/Step1'
import Step2 from 'pages/Step2'
import Step3 from 'pages/Step3'

import Step4 from 'pages/Step4'
import Step5 from 'pages/Step5'
import Step6 from 'pages/Step6'

import Success from 'pages/Success'

const IS_CAMPAIGN_URL = /^\/.+$/.test(window.location.pathname)

export const AppRoute = ({ component: Component, layout: Layout = MainLayout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )}/>
)

export const MainLayout = ({ children }) => {
    return (
        <BaseLayout>
            <TopBar/>
            {children}
            <Footer/>
        </BaseLayout>
    )
}

// const NoLayout = (props) => (<>{props.children}</>)

export default function App () {
    const { state, dispatch } = React.useContext(Store)

    React.useEffect(() => {
        if (IS_CAMPAIGN_URL && state.campaign === null && state.errors.campaignNotFound !== true) {
            fetchCampaign(dispatch)
            fetchLead(dispatch)
        }

        if (state.campaign) {
            document.title = `${state.campaign.client.name}`
        }
    })

    React.useEffect(() => {
        if (IS_CAMPAIGN_URL && state.campaign === null) return
        setTimeout(() => {
            document.body.classList.remove('loading')
        }, 500)
    }, [state.campaign])

    if (state.errors.campaignNotFound) {
        return <CampaignNotFound/>
    }

    if (IS_CAMPAIGN_URL && (state.campaign === null || state.lead === null)) {
        return <h1>Loading</h1>
    }

    return (
        <Suspense fallback={<div>loading...</div>}>
            <BrowserRouter>
                <Switch>
                    <AppRoute exact path="/:url" layout={MainLayout} component={Landing}/>
                    <AppRoute exact path="/:url/make-a-donation" layout={MainLayout} component={MakeADonation} />
                    <AppRoute exact path="/:url/step-1" layout={MainLayout} component={Step1} />
                    <AppRoute exact path="/:url/step-2" layout={MainLayout} component={Step2} />
                    <AppRoute exact path="/:url/step-3" layout={MainLayout} component={Step3} />
                    <AppRoute exact path="/:url/step-4" layout={MainLayout} component={Step4} />
                    <AppRoute exact path="/:url/step-5" layout={MainLayout} component={Step5} />
                    <AppRoute exact path="/:url/step-6" layout={MainLayout} component={Step6} />
                    <AppRoute exact path="/:url/success" layout={MainLayout} component={Success} />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
}
