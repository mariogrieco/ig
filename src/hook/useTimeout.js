// @flow
import { useEffect, useRef } from 'react'

export default function useTimeout (callback: Function, delay: number) {
    const savedCallback = useRef()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick () {
            savedCallback.current()
        }

        if (delay !== null) {
            let id = setTimeout(tick, delay)
            return () => clearTimeout(id)
        }
    }, [delay])
}
