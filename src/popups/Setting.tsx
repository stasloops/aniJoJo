import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import Link from "next/link"
import { useDispatch } from 'react-redux'
import { useClose } from '../hooks/useClose'
import { LOGOUT } from '../mutations/user'
import { resetUser } from '../store/reducers/auth/authSlice'
import { setSettingPopup } from '../store/reducers/auth/popupSlice'
import style from '../styles/setting.module.scss'
import { useSvg } from '../hooks/useSvg'
import { useRouter } from "next/router"

const SettingPopup = () => {
    const redux = true
    const { value } = useClose(setSettingPopup, redux)
    const [logout] = useMutation(LOGOUT)
    const dispatch = useDispatch()
    const router = useRouter()
    const { svg } = useSvg()

    const close = () => {
        dispatch(setSettingPopup(false))
    }

    const logOut = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const tokens = JSON.parse(token)
            logout({
                variables: {
                    input: {
                        refreshToken: tokens?.refreshToken
                    }
                }
            }).then(({ data }) => {
                if (data.logout.errors.code === 200) {
                    close()
                    dispatch(resetUser())
                }
            }).catch((e) => {
                console.log(e);
            })
        }
    }
    return (
        <div className={style.setting}>
            <div ref={value} className={style.setting__inner}>
                <span onClick={close} className={style.setting__close}><span>X</span></span>
                <span onClick={close} className={style.setting__my}>
                    <Link href={`/favorites`}>
                        <a className={style.setting__my_box}>
                            <span style={{ color: router.asPath === '/favorites' ? '#cae962' : '' }} className={style.setting__svg}>{svg.favorite}</span>
                            <span>Мои</span>
                        </a>
                    </Link>
                </span>
                <button onClick={logOut} className={style.setting__logout}>Выход</button>
            </div>
        </div>
    )
}

export default SettingPopup