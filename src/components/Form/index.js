// @flow
import * as React from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'
import Button from '../Button'

import withTheme from 'hoc/withTheme'
import supportedThemes, { Theme } from './themes/__supportedThemes'

type FormProps = {
    onClick?: (e: SyntheticEvent) => void,
    onSubmit?: (e: SyntheticEvent) => void,
    children?: ?React.Node,
    theme: Theme
};

export default withTheme(supportedThemes)(function Form (props: FormProps) {
    return (
        <form
            onClick={props.onClick}
            onSubmit={props.onSubmit}
            className={styles.form}
            style={{
                '--color-selected': props.theme.colorSelected,
                '--color-title-color': props.theme.titleColor
            }}
        >
            {props.children}
        </form>
    )
})

export function Row ({ children }: { children: React.Children }) {
    return <div className={styles.row}>{children}</div>
}

export function RowColumns ({ children, className }: { children: React.Children }) {
    return <div className={cn(styles.rowColumns, className)}>{children}</div>
}

export function RowColumn (props: { children: React.Children, size?: number, padding?: number, className?: string, }) {
    return <div className={cn(styles.rowColumn, props.className)} style={{ flexBasis: props.size * 100 + '%', padding: props.padding}}>{props.children}</div>
}

type SubmitProps = {
    isLoading?: boolean,
    label?: string,
    color?: string,
    size?: string
};

export function Divider () {
    return <div className={styles.divider}/>
}

export const Submit = withTheme(supportedThemes)(function (props: SubmitProps) {
    return (
        <Button isSubmit disabled={props.isLoading} loading={props.isLoading} color='primary' onClick={() => {
        }} style={props.style || { backgroundColor: props.theme.colorSelected }}>{props.label}</Button>
    )
})

Submit.defaultProps = {
    isLoading: false,
    color: 'primary',
    size: 'medium',
    cancel: 'Cancel',
    submit: 'Submit'
}

export { default as Field } from './Fields/Field'
export { default as Label } from './Label'
export { default as Panel } from './Panel'
export { default as Tabs } from './Tabs'
export { default as RadioButtons } from './RadioButtons'
export { default as Choices } from './Fields/Choices'
export { default as Dropdown } from './Fields/Dropdown'
export { default as ModelPickerDropdown } from './Fields/ModelPickerDropdown'
export { default as Checkbox } from './Fields/Checkbox'
