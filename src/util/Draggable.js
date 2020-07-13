export default class Draggable {
    constructor (element, handle = null, onDrag = null) {
        this._element = element
        this._handle = handle || element
        this._onDrag = onDrag
        this._percentPosition = 0

        const moveHandler = (offsetX, dragWidth, event) => {
            let clientX = event.clientX || event.touches[0].clientX

            _handleDragMove(offsetX, dragWidth, clientX, document.body.getBoundingClientRect().width)
        }

        const _handleDragStart = (e) => {
            let dragWidth = e.currentTarget.offsetWidth
            let offsetX = e.clientX || e.touches[0].clientX

            const listener = moveHandler.bind(this, offsetX - e.currentTarget.getBoundingClientRect().left, dragWidth)
            window.addEventListener('mousemove', listener)
            window.addEventListener('touchmove', listener)

            window.addEventListener('mouseup', () => window.removeEventListener('mousemove', listener))
            window.addEventListener('touchend', () => window.removeEventListener('mousemove', listener))

            e.preventDefault() // disable selection
        }

        const _handleDragMove = (offsetX, drgW, pageX, rightBound) => {
            let leftOffset = pageX - offsetX + drgW / 2

            this._element.style.left = Math.max(0, Math.min(leftOffset, rightBound)) + 'px'
            this._percentPosition = leftOffset / window.outerWidth

            if (typeof this._onDrag === 'function') {
                this._onDrag(leftOffset)
            }
        }

        this._handle.addEventListener('mousedown', _handleDragStart)
        this._handle.addEventListener('touchstart', _handleDragStart)

        window.addEventListener('resize', () => {
            this.setPosition(this._percentPosition * window.outerWidth)
        })
    }

    setPosition (screenX) {
        this._element.style.left = screenX + 'px'
        this._percentPosition = screenX / window.outerWidth

        if (typeof this._onDrag === 'function') {
            this._onDrag(screenX)
        }
    }

    showHandle () {
        this._handle.classList.add('__visible')
    }
}
