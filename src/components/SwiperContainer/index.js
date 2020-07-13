import React, { useState } from 'react'
import Swiper from 'react-id-swiper'
import customTheme from './styles.module.scss'

import cn from 'classnames'

import 'swiper/swiper.scss'

const defaultConfig = {
    spaceBetween: 40
}

export default function SwiperContainer ({ children, config = defaultConfig, containerClassNmae }) {
    const [swiper, updateSwiper] = useState(null);
    const [reachEnd, setReach] = useState(false);

    const goNext = () => {
        if (swiper !== null) {
            swiper.slideNext();
        }
    };
    const goPrev = () => {
        if (swiper !== null) {
            swiper.slidePrev();
        }
    };

    if (swiper) {
        swiper.on('reachEnd', () => setReach(true))
        swiper.on('reachBeginning', () => setReach(false))
    }

    return (
        <div className={containerClassNmae}>
            <Swiper {...config} getSwiper={updateSwiper}>{children}</Swiper>
            <button className={cn(customTheme.btn, customTheme.left, reachEnd ? {} : customTheme.focus )} onClick={goPrev}></button>
            <button className={cn(customTheme.btn, customTheme.right, reachEnd ? customTheme.focus : {})} onClick={goNext}></button>
        </div>
    )
}
