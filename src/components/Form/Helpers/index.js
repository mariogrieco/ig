export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export function makeId (prefix) {
    return (
        prefix +
    Math.random()
        .toString(36)
        .substr(2, 9)
    )
}
