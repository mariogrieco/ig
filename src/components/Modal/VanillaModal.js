// @flow

import './Modal.scss'

import Layer from 'util/layer'
import html from 'util/html'

const MODAL_CLOSE_BTN = `<button class="sh-modal-close-btn">Close Modal</button>`
const MODAL_CONTAINER = `<div class="sh-modal-overlay"><div class="sh-modal-content-container"><div class="sh-modal-content-inner"></div></div></div>`
const MODAL_LOADER = `<div class="sh-modal-loader"><img src="/images/oval_loader.svg" alt="Loading Animation"/></div>`

type ModalOptions = {
    closeFromOverlay?: boolean;
    closeByEscape?: boolean;
    persistent?: boolean;
    showCloseButton?: boolean;
    extraCss?: Object;
    onCancel?: () => void;
    afterInit?: (modalInstance) => void;
    afterOpen?: (modalInstance) => void;
    beforeClose?: (modalInstance) => void;
    afterClose?: (modalInstance) => void;
}

export default class Modal {
    modalElement: HTMLElement;

    static loadingModal: ?Modal = null;

    static getLoadingModal (): Modal {
        if (Modal.loadingModal) {
            return Modal.loadingModal
        }

        Modal.loadingModal = new Modal(MODAL_LOADER, {
            closeByEscape: true,
            closeFromOverlay: false,
            showCloseButton: false,
            extraCss: {
                width: '8em',
                background: 'transparent'
            }
        })

        return Modal.loadingModal
    }

    static oneTimeModal (content: string | Element, options?: ModalOptions): Modal {
        return new Modal(content, Object.assign(options || {})).show()
    }

    static showFromURL (url: string, options?: ModalOptions): Modal {
        Modal.getLoadingModal().show()

        if (url) {
            fetch(url).then(response => {
                response.text().then(markup => {
                    Modal.getLoadingModal().hide()
                    new Modal(markup, Object.assign(options || {}, { persistent: false })).show()
                })
            })
        } else {
            Modal.getLoadingModal().hide()
            throw new Error('No url provided.')
        }
    }

    constructor (modalContent: string | Element, options?: ModalOptions) {
        this.isVisible = false
        this.isConstructed = false
        this.modalContent = modalContent
        this.closeButton = html`${MODAL_CLOSE_BTN}`

        this.options = Object.assign({
            closeFromOverlay: true,
            closeByEscape: true,
            showCloseButton: true,
            persistent: false,
            extraCss: {}
        }, options || {})

        this.modalElement = html`${MODAL_CONTAINER}`
        this.modalElement['_modalInstance'] = this
    }

    _constructModal (content): Element | string {
        this.isConstructed = true
        let contentContainer = this.modalElement.querySelector('.sh-modal-content-inner')

        this.layer = new Layer(this.modalElement, this.resolveCancel)

        if (this.options.extraCss) {
            Object.keys(this.options.extraCss).forEach(cssAttribute => {
                contentContainer.style[cssAttribute] = this.options.extraCss[cssAttribute]
            })
        }

        if (typeof content === 'string') {
            contentContainer.innerHTML = content.trim()
        } else if (content instanceof Element) {
            contentContainer.append(...content.childNodes)
        } else {
            throw new Error('Invalid modal content. Eg: \'new Modal(\'<div>my modal content</div>\')\'')
        }

        if (this.options.showCloseButton) {
            const modalContainer = this.modalElement.querySelector('.sh-modal-content-container')
            this.closeButton.parentNode !== modalContainer && modalContainer.append(this.closeButton)

            this.closeButton.addEventListener('click', e => {
                this.close()
            })
        }

        if (typeof this.options.afterInit === 'function') {
            this.options.afterInit(this)
        }

        return this.modalElement
    }

    resolveCancel = (layer: Layer, source: string) => {
        return new Promise(resolve => {
            switch (source) {
            default:
                break
            case 'backdrop':
                if (this.options.closeFromOverlay === true) {
                    if (typeof this.options.onCancel === 'function') {
                        this.options.onCancel()
                    }

                    resolve()
                }
                break
            case 'escape':
                if (this.options.closeByEscape === true) {
                    if (typeof this.options.onCancel === 'function') {
                        this.options.onCancel()
                    }

                    resolve()
                }
                break
            }
        })
    }

    show () {
        if (!this.options.persistent) {
            this._constructModal(this.modalContent)
        } else {
            if (!this.isConstructed) this._constructModal(this.modalContent)
            this.layer.initialize()
        }

        document.body.classList.add('sh-modal-active')
        this.isVisible = true

        if (typeof this.options.afterOpen === 'function') this.options.afterOpen(this)

        return this
    }

    hide () {
        document.body.classList.remove('sh-modal-active')
        this.isVisible = false
    }

    close () {
        if (typeof this.options.beforeClose === 'function') {
            const shouldClose = this.options.beforeClose(this)

            if (shouldClose === false) {
                return
            }
        }

        if (!this.options.persistent) {
            this.destroy()
        } else {
            this.hide()
        }

        this.layer.destroy()

        if (typeof this.options.afterClose === 'function') this.options.afterClose(this)

        if (typeof this.options.onCancel === 'function') {
            this.options.onCancel()
        }
    }

    destroy () {
        this.hide()

        this.modalElement.remove()
        this.isConstructed = false
    }
}
