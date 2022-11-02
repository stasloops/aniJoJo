import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"

export const useClose = (toggleFunc: (state: boolean) => void, redux: boolean) => {
    const value = useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch<any>()

    const closeHandler = (e: MouseEvent) => {
        const path: EventTarget[] = e.composedPath()
        if (value.current && !path.includes(value.current)) {
            redux ?
                dispatch(toggleFunc(false))
                :
                toggleFunc(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', closeHandler)
        })
        return () => {
            document.removeEventListener('click', closeHandler)
        }
    }, [])

    return {
        value
    }
}