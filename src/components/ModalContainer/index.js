import React from 'react'
import ReactDOM from 'react-dom'

import { useTransition, animated, config } from 'react-spring'

import styles from './styles.module.scss'

export function ModalBody ({ children, show }) {
    const transitions = useTransition(show, null, {
        from: {
            left: '50%',
            top: '0%',
            transform: 'translate(-0%, -50%)'
        },
        enter: {
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        },
        leave: {
            left: '150%',
            top: '50%',
            transform: 'translate(-50%, 50%)'
        },
        config: config.stiff,
        unique: true,
        trail: 100
    })
    return transitions.map(({ item, key, props }) => item && <animated.div key={key} style={props} className={styles.modalBody}>{children}</animated.div>)
}

export const ModalOverlay = ({ onClickOverlay, show }) => {
    const transitions = useTransition(show, null, {
        from: { opacity: 0.25, backgroundColor: 'rgba(29, 29, 29, 0.15)' },
        enter: { opacity: 1, backgroundColor: 'rgba(29, 29, 29, 0.4)' },
        leave: { opacity: 1, backgroundColor: 'rgba(29, 29, 29, 0.5)' },
        unique: true,
        trail: 100
    })
    return transitions.map(({ item, key, props }) => item && <animated.div key={key} style={props} onClick={onClickOverlay} className={styles.modalOverlay} />)
}

export default function ModalContainer ({ children, show, onClickOverlay }) {
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClickOverlay={onClickOverlay} show={show} />
            <ModalBody show={show}>
                {children}
            </ModalBody>
        </>,
        document.getElementById('modal-root')
    )
}
