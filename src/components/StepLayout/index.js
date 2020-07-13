import React from 'react'

import styles from './styles.module.scss'

const StepLayout = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default StepLayout
