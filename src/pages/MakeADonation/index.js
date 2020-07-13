import React from 'react'
import { BodyLayout, LeftSide, RigthSide } from 'components/MainLayout'
import styles from './styles.module.scss'
import Step1 from 'components/MaKeADonation'

import leftSide from './images/leftSide.jpg'

export default ({
    history,
    location
}) => {
    return (
        <BodyLayout className={styles.container}>
            <LeftSide title="Together, we can support our students' dreams." className={styles.imgContainer} style={{
                backgroundImage: `url(${leftSide})`
            }}>
            </LeftSide>
            <RigthSide style={{ backgroundColor: '#F9F5F1' }}>
                <Step1
                    handleDonateOnline={() => {
                        window.scrollTo(0, 0)
                        history.push(`step-1${location.search}`)
                    }}
                    handleDonateCall={() => {
                        history.push(`step-3${location.search}&by-phone=true`)
                    }}
                    handleDonateEmail={() => {
                        history.push(`step-3${location.search}&by-email=true`)
                    }}
                />
            </RigthSide>
        </BodyLayout>
    )
}
