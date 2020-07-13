// @flow
import React from 'react'
import VimeoPlayer from '@vimeo/player'

import styles from './styles.module.scss'

const VIMEO_PATTERN = /^https?:\/\/vimeo.com\/(\d+)/

type Props = {
    src: string
}

function VideoPlayer (props: Props, ref) {
    const videoTag = React.useRef()
    const vimeoIframe = React.useRef()

    const vimeoId = React.useMemo(() => {
        const match = props.src.match(VIMEO_PATTERN)

        return match ? match[1] : null
    }, [props.src])

    React.useImperativeHandle(ref, () => ({
        play: () => {
            if (vimeoId) {
                (new VimeoPlayer(vimeoIframe.current).play())
            } else {
                videoTag.current.play()
            }
        }
    }))

    return (
        <div className={styles.wrapper}>
            {vimeoId ? (
                <div className={styles.iframeWrapper}>
                    <iframe
                        ref={vimeoIframe}
                        src={`https://player.vimeo.com/video/${vimeoId}`}
                        allow="autoplay"
                        frameBorder={0}
                        title='vimeo-player'
                        style={{}}
                    />
                </div>
            ) : (
                <video ref={videoTag} controls>
                    <source src={props.src} type="video/mp4"/>
                </video>
            )}
        </div>
    )
}

export default React.forwardRef(VideoPlayer)
