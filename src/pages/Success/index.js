import React from 'react'
import { BodyLayout, LeftSide, RigthSide } from 'components/MainLayout'

import styles from './styles.module.scss'
import leftSide from './images/leftSide.jpg'
import { Store } from 'Store'
import { Redirect } from 'react-router-dom'

import Success from 'components/LeadGenForm/Success'

export default ({ history, location, match }) => {
    const { state } = React.useContext(Store)
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
                <Success state={state} />
            </RigthSide>
        </BodyLayout>
    )
}
