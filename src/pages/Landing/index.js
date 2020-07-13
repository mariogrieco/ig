import React from 'react'
import { BodyLayout, LeftSide, RigthSide } from 'components/MainLayout'

import Landing from 'components/Landing'

import styles from './styles.module.scss'
import leftSide from './images/leftSide.jpg'

export default ({ history, location, match }) => {
    return (
        <BodyLayout className={styles.container}>
            <LeftSide className={styles.imgContainer} style={{
                backgroundImage: `url(${leftSide})`
            }}>
            </LeftSide>
            <RigthSide style={{ backgroundColor: '#F9F5F1' }}>
                <Landing
                    onSubmit={(data, done) => {
                        window.scrollTo(0, 0)
                        history.push(`${match.params.url}/make-a-donation${location.search}`)
                    }}
                    initialValues={{}}
                />
            </RigthSide>
        </BodyLayout>
    )
}
