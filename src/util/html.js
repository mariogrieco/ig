// @flow

function constructNodeFromString (stringElement: string): HTMLElement {
    let div = document.createElement('div')

    div.innerHTML = stringElement.trim()

    return div.firstChild
}

export default function html (strings: string[], ...keys: any) {
    let result = ''
    for (let i = 0; i < strings.length; i++) {
        result += strings[i] + (keys[i] || '')
    }

    return constructNodeFromString(result)
}
