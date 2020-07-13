// @flow
import html from './html'

const layersContainerStyle = `
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
`

const layerStyle = `
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
`

const LAYERS_CONTAINER = `<div style="${layersContainerStyle}"></div>`
const LAYER = `<div style="${layerStyle}"></div>`

export default class Layer {
    static wrapper: HTMLElement = html`${LAYERS_CONTAINER}`
    static instances: Layer[] = [];
    static hasCloseHandlers: boolean = false;
    static zIndexCoefficient: number = 100;

    constructor (content: HTMLElement, requestClose: (layer: Layer, source: string) => Promise) {
        this.content = content
        this.requestClose = requestClose

        Layer._initializeWrapper()
        this.initialize()
    }

    static _initializeWrapper = () => {
        Layer.enablePointerEvents()

        if (!document.body.contains(Layer.wrapper)) {
            document.body.appendChild(Layer.wrapper)
        }
    };

    static _addCloseHandlers = () => {
        if (!Layer.hasCloseHandlers) {
            Layer.wrapper.addEventListener('click', Layer._handleBackdropClick)
            document.addEventListener('keydown', Layer._handleEscapePress)

            Layer.hasCloseHandlers = true
        }
    }

    static _removeCloseHandlers = () => {
        Layer.wrapper.removeEventListener('click', Layer._handleBackdropClick)
        document.removeEventListener('keydown', Layer._handleEscapePress)

        Layer.hasCloseHandlers = false
    }

    static _handleBackdropClick = (event: Event) => {
        const activeInstance = Layer.instances[Layer.instances.length - 1]

        if (activeInstance.layerElement.isSameNode(event.target)) {
            Layer._requestClose(activeInstance, 'backdrop')
        }
    }

    static _handleEscapePress = (event: Event) => {
        const activeInstance = Layer.instances[Layer.instances.length - 1]

        if (event.key === 'Escape') {
            Layer._requestClose(activeInstance, 'escape')
        }
    }

    static _requestClose = (instance: Layer, source: string) => {
        instance.requestClose(instance, source).then(() => instance.destroy())
    }

    static enablePointerEvents = () => {
        Layer.wrapper.style.pointerEvents = ''
    }

    static disablePointerEvents = () => {
        Layer.wrapper.style.pointerEvents = 'none'
    };

    destroy = () => {
        this.isDestroyed = true
        this.layerElement.remove()
        Layer.instances.pop()

        this.update()
    };

    update = () => {
        if (Layer.instances.length > 0 && Layer.instances.length < 2) {
            Layer._addCloseHandlers()
            Layer.wrapper.style.visibility = 'visible'
        } else if (Layer.instances.length === 0) {
            Layer.wrapper.style.visibility = 'hidden'
            Layer._removeCloseHandlers()
        }
    };

    initialize = () => {
        if (!Layer.instances.includes(this)) Layer.instances.push(this)

        if (!this.layerElement) {
            this.layerElement = html`${LAYER}`
            this.layerElement.appendChild(this.content)
            this.layerElement.style.zIndex = Layer.zIndexCoefficient * Layer.instances.length
        }

        if (!Layer.wrapper.contains(this.layerElement)) {
            Layer.wrapper.appendChild(this.layerElement)
        }

        this.update()
    };
}
