import React from 'react'
import { BodyLayout, LeftSide, RigthSide } from 'components/MainLayout'
import { updateLead } from 'Actions'
import { Redirect } from 'react-router-dom'
import { Store } from 'Store'

import queryStr from 'query-string'

import styles from './styles.module.scss'
import leftSide from './images/leftSide.jpg'
import Step3 from 'components/LeadGenForm/Step3'

export default ({ history, location, match }) => {
    const parsedQuery = queryStr.parse(location.search)
    const byPhone = parsedQuery['by-phone'] === 'true'
    const byEmail = parsedQuery['by-email'] === 'true'
    const { state, dispatch } = React.useContext(Store)
    const [submitted, setSubmitted] = React.useState(false)

    if (submitted) {
        return <Redirect to={`step-4${location.search}`} push />
    }

    if (!state.lead) {
        return <Redirect to={`/${match.params.url}${location.search}`} push />
    }

    return (
        <BodyLayout className={styles.container}>
            <LeftSide title="Together, we can support our students' dreams." className={styles.imgContainer} style={{
                backgroundImage: `url(${leftSide})`
            }}>
            </LeftSide>
            <RigthSide style={{ backgroundColor: '#F9F5F1' }}>
                <Step3
                    byPhone={byPhone}
                    byEmail={byEmail}
                    toEmail={() => {
                        window.scrollTo(0, 0)
                        delete parsedQuery['by-phone']
                        parsedQuery['by-email'] = true
                        history.push(`/${match.params.url}/step-3?${queryStr.stringify(parsedQuery)}`)
                    }}
                    toPhone={() => {
                        window.scrollTo(0, 0)
                        delete parsedQuery['by-email']
                        parsedQuery['by-phone'] = true
                        history.push(`/${match.params.url}/step-3?${queryStr.stringify(parsedQuery)}`)
                    }}
                    toStep1={() => {
                        window.scrollTo(0, 0)
                        delete parsedQuery['by-phone']
                        delete parsedQuery['by-email']
                        history.push(`/${match.params.url}/step-1?${queryStr.stringify(parsedQuery)}`)
                    }}
                    onSubmit={async (data, done) => {
                        try {
                            let lead = {
                                fields: data,
                                isComplete: false
                            }
                            await updateLead(dispatch, state.code, lead)
                            setSubmitted(true)
                            window.scrollTo(0, 0)
                        } catch (err) {
                            alert('Oops something went wrong')
                            console.error(err)
                            done(err)
                        }
                    }}
                    initialValues={state.lead && state.lead.fields ? state.lead.fields : {}}
                    />
            </RigthSide>
        </BodyLayout>
    )
}
