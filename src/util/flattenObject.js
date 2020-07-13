export default function (object, separator) {
    separator = separator || '.'

    return Object.assign({}, ...(function _flatten (objectBit, path = '') { // spread the result into our return object
        return [].concat( // concat everything into one level
            ...Object.keys(objectBit).map( // iterate over object
                key => typeof objectBit[ key ] === 'object' // check if there is a nested object
                    ? _flatten(objectBit[ key ], `${path}${path ? separator : ''}${key}`) // call itself if there is
                    : ({ [ `${path}${path ? separator : ''}${key}` ]: objectBit[ key ] }) // append object with it’s path as key
            )
        )
    }(object)))
}
