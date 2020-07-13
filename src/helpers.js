// @flow
import canvg from 'canvg'

const toBlob = require('canvas-to-blob')

export function svgToImage (svgElement, done) {
    const canvas = document.createElement('canvas')
    // // Need to be attached to the dom, otherwise it looks funky
    document.body.appendChild(canvas)

    canvas.width = svgElement.viewBox.baseVal.width * 2
    canvas.height = svgElement.viewBox.baseVal.height * 2

    canvas.style.display = 'none'

    const voucher = new XMLSerializer().serializeToString(svgElement).replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, '')

    if (canvas) {
        canvg(canvas, voucher, {
            log: true,
            ignoreAnimation: true,
            ignoreDimensions: true,
            ignoreMouse: true,
            forceRedraw: () => false,
            renderCallback: () => {
                if (toBlob.supported) {
                    toBlob.init()
                    canvas.toBlob(blob => { return done(blob) }, 'image/png')
                    canvas.remove()
                }
            }
        })
    }
}

export const downloadBlob = (function () {
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style.display = 'none'

    return function (blob, fileName) {
        const url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = fileName
        a.click()
        window.URL.revokeObjectURL(url)
    }
}())
