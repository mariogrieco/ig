import React from 'react'
import { BodyLayout, LeftSide, RigthSide } from 'components/MainLayout'
import { Redirect } from 'react-router-dom'
import { updateLead } from 'Actions'
import { Store } from 'Store'

import styles from './styles.module.scss'
import leftSide from './images/leftSide.jpg'
import Step5 from 'components/LeadGenForm/Step5'

export default ({ history, location, match }) => {
    const { state, dispatch } = React.useContext(Store)
    const [submitted, setSubmitted] = React.useState(false)
    if (submitted) {
        return <Redirect to={`step-6${location.search}`} push />
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
                <Step5
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
