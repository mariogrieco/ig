// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import ShiftModal from './VanillaModal'

type Props = {
    closeFromOverlay?: boolean;
    closeByEscape?: boolean;
    persistent?: boolean;
    showCloseButton?: boolean;
    extraCss?: Object;
    isOpen?: boolean;
    onCancel?: () => void;
    afterInit?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
    children?: React.Node;
}

type State = {
    modalContent: null;
    closable: boolean;
}

export default
class Modal extends React.Component<Props, State> {
    static defaultProps = {
        closeFromOverlay: true,
        closeByEscape: true,
        showCloseButton: true,
        persistent: false,
        isOpen: false,
        extraCss: {}
    };

    constructor (props: Props) {
        super(props)

        this.state = {
            modalContent: null,
            closable: true
        }
    }

    componentDidMount () {
        this.initializeVanillaComponent()
        this.handleVisibility(true)
    }

    componentWillUnmount () {
        this._modal.destroy()
    }

    initializeVanillaComponent = () => {
        this._modal = new ShiftModal('<div class="react-modal-wrapper"></div>', {
            closeFromOverlay: this.props.closeFromOverlay,
            showCloseButton: this.props.showCloseButton,
            closeByEscape: this.props.closeByEscape,
            persistent: this.props.persistent,
            onCancel: this.props.onCancel || null,
            afterInit: this.props.afterInit || null,
            afterOpen: this.afterOpen,
            beforeClose: this.props.beforeClose || null,
            afterClose: this.props.afterClose || null,
            extraCss: this.props.extraCss
        })
    };

    componentDidUpdate (prevProps: Props) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.handleVisibility()
        }

        return null
    }

    handleVisibility (initial: boolean) {
        if (this.props.isOpen) {
            this._modal.show()
        } else {
            if (!initial) {
                this.state.closable && this._modal.close()

                this.setState({
                    modalContent: null
                })
            }
        }
    }

    afterOpen = () => {
        this.setState({
            modalContent: ReactDOM.createPortal(
                this.props.children,
                this._modal.modalElement.querySelector('.react-modal-wrapper')
            )
        }, () => {
            typeof this.props.afterOpen === 'function' && this.props.afterOpen()
        })
    };

    render () {
        return this.state.modalContent
    }
}
