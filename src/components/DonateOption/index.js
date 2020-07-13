import React from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'

const DonateOption = ({
    title,
    description,
    icon,
    onClick,
    center,
    small,
    active
}) => {
    return (
        <div className={cn(styles.donateBtn, {
            [styles['donateBtn--small']]: small,
            [styles.active]: active
        })} onClick={onClick}>
            {icon && <div className={styles.icon} style={{ backgroundImage: `url(${icon})` }}></div>}
            {title && <span className={cn({
                [styles.center]: center
            })}>{title}</span>}
            {description && <p>{description}</p>}
        </div>
    )
}

export default DonateOption
