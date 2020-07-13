// @flow
import React from 'react'
import flattenObject from 'util/flattenObject'

type Props = {
  id: string,
  required?: boolean,
  options: { [string]: string } | { [string]: { [string]: string } }
};

const DataList = (props: Props) => {
    const { id, options } = props

    return (
        <datalist id={id} required={props.required || true}>
            {Object.values(flattenObject(options)).map((item, index) => (
                <option value={item} key={index} />
            ))}
        </datalist>
    )
}

export default DataList
