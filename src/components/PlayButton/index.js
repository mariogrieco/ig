// @flow
import * as React from 'react'

import Color from 'color'

const PlayButton = ({ fill }: { fill: string }) => (
    <svg
        viewBox='0 0 97 97'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
    >
        <circle 
            fillOpacity='0.75' 
            fill={fill ? Color(fill).fade(0.2) : '#FFFFFF'} 
            cx='48.5' cy='48.5' r='48.5' />
        <circle
            id='play-button-circle'
            fill={fill || '#000000'}
            cx='48.5'
            cy='48.5'
            r='40.3192771'
        />
        <polygon
            fill="#FFFFFF"
            points='66.6144578 47.3313253 37.3975904 64.2771084 37.3975904 30.3855422'
        />
    </svg>
)

export default PlayButton
