// @flow
import * as React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import withTheme from 'hoc/withTheme'

import supportedThemes from './themes/__supportedThemes.js'
import styles from './styles.module.scss'

export type Props = {
    children: React.Node,
    href: ?string,
    onClick: ?Function,
    to?: string,
    color?: string,
    icon?: string,
    size?: 'small' | 'medium' | 'regular' | 'large',
    padding: null | 'regular',
    outlined: boolean,
    inverted: boolean,
    rounded: boolean,
    link: boolean,
    hover: boolean,
    focus: boolean,
    active: boolean,
    loading: boolean,
    disabled: boolean,
    iconPosition: 'start' | 'end',
    iconSize?: number,
    isSubmit: Boolean,
}

type LinkProps = Props & {
    href: string
}

type ButtonProps = Props & {
    onClick: Function
}

function buildButtonClasses (props: Props): Object {
    let classes = {
        [styles.button]: true,
        [styles.icon]: props.icon,
        [styles.isOutlined]: props.outlined,
        [styles.isInverted]: props.inverted,
        [styles.isRounded]: props.rounded,
        [styles.isLink]: props.link,
        [styles.isHover]: props.hover,
        [styles.isFocus]: props.focus,
        [styles.isActive]: props.active,
        [styles.isLoading]: props.loading,
        [styles.isDisabled]: props.disabled
    }

    if (props.color) {
        classes[`__color-${props.color}`] = true
    }

    if (props.size) {
        classes[`__size-${props.size}`] = true
    }

    if (props.padding !== 'regular') {
        classes[`__padding-${props.padding || 'none'}`] = true
    }

    return classes
}

class Button extends React.Component<LinkProps | ButtonProps> {
    render () {
        const props = this.props
        const loader = { '--color-loader': `url(${props.theme.loader})` }

        let content = props.children

        if (props.icon) {
            const iconImg = <div className='sh-button__icon'>
                <img src={props.icon} alt='Icon' style={{ height: props.iconSize ? props.iconSize + 'px' : null }} />
            </div>

            content = (
                <>
                    {props.iconPosition === 'start' ? iconImg : null}
                    <div className='sh-button__text'>
                        {props.children}
                    </div>
                    {props.iconPosition === 'end' ? iconImg : null}
                </>
            )
        }

        const classes = buildButtonClasses(this.props)

        if (props.to) {
            return <Link className={cn(classes)} to={this.props.to}>{content}</Link>
        }

        return props.href
            ? <a href={props.href} style={{ ...props.style, ...loader }} className={cn(classes)}>{content}</a>
            : <button style={{ ...props.style, ...loader }} type={props.isSubmit ? 'submit' : 'button'} disabled={props.disabled} onClick={props.onClick} className={cn(classes)}>{content}</button>
    }
}

Button.defaultProps = {
    outlined: false,
    inverted: false,
    rounded: false,
    link: false,
    padding: 'regular',
    hover: false,
    focus: false,
    active: false,
    loading: false,
    disabled: false,
    iconPosition: 'start',
    isSubmit: false
}

export default withTheme(supportedThemes)(Button)

export const ButtonGroup = ({ children, className }: { children: React.Node, className: String}) => (
    <div className={`sh-button-group ${className}`}>{children}</div>
)

ButtonGroup.defaultProps = {
    className: '',
}
