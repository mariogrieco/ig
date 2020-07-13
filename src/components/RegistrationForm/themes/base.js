// @flow
import type { Theme } from './__supportedThemes'

import lightLoader from '../images/three_dots_loader_light.svg'

export default function (globalTheme): Theme {
    return {
        input: {
            color: globalTheme.colors.ternary
        },
        button: {
            background: globalTheme.colors.primary,
            color: '#fff',
            borderTopColor: globalTheme.colors.primary,
        },
        loader: lightLoader,
        titleColor: '#BDBFC3'
    }
}
