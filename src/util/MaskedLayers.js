export default class MaskedLayers {
    constructor (root) {
        this._root = root
        this._layers = root.getElementsByClassName('js-masked-layer')
        this._boundingRect = root.getBoundingClientRect()
        this._maskPositionX = this._boundingRect.right

        this._updateMask()

        window.addEventListener('resize', () => {
            this._boundingRect = root.getBoundingClientRect()
        })
    }

    setCutLine (screenX) {
        this._maskPositionX = Math.max(0, Math.min(screenX - this._boundingRect.left, this._boundingRect.width))
        this._updateMask()
    }

    _updateMask () {
        let clip

        for (let i = 0; i < this._layers.length; i++) {
            switch (this._layers[i].dataset['mask']) {
            case 'left':
                clip = `rect(0, ${this._maskPositionX}px, ${this._boundingRect.height}px, 0)`
                break
            case 'right':
                clip = `rect(0, ${this._boundingRect.width}px, ${this._boundingRect.height}px, ${this._maskPositionX}px)`
                break
            default:
                throw new Error('Missing data-make attribute')
            }

            this._layers[i].style.clip = clip
        }
    }
}
