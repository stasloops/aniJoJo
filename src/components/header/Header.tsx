import Link from "next/link"
import { useRouter } from "next/router"
import React, { FC, memo, useState, useEffect } from "react"
import style from '../../styles/header.module.scss'
import SearchOptions from "../search-options/SearchOptions"
import { useMutation } from "@apollo/client";
import { REFRESH } from '../../mutations/user'
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../store/reducers/auth/authSlice"
import { setSettingPopup } from "../../store/reducers/auth/popupSlice"
import { useClose } from "../../hooks/useClose"

const Header: FC = () => {
    const [value, setValue] = useState<string>('')
    const [userIsLoading, setUserIsLoading] = useState<boolean>(true)
    const [isMobileInput, setIsMobileInput] = useState<boolean>(false)
    const router = useRouter()
    const redux = false
    const { value: currentInput } = useClose(setIsMobileInput, redux)
    const [refresh] = useMutation(REFRESH)
    const auth = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()


    const openIsMobileInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setTimeout(() => {
            setIsMobileInput(true)
        })
       
    }

    const onNavigateSearch = (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
        e.preventDefault()
        if (value.length > 0) {
            router.push(`/search/${value}`)
            setValue('')
            setIsMobileInput(false)
        }
    }

    const getAndSetUser = () => {
        const userData = localStorage.getItem('user')
        if (userData) {
            dispatch(getUser(JSON.parse(userData)))
        }
    }


    useEffect(() => {
        getAndSetUser()
        setUserIsLoading(true)

        const token: any = localStorage.getItem('token')
        if (token) {
            const tokens = JSON.parse(token)
            refresh({
                variables: {
                    input: {
                        refreshToken: tokens?.refreshToken
                    }
                }
            }).then(({ data }) => {
                localStorage.setItem('token', JSON.stringify(data.refresh.tokens))
                localStorage.setItem('user', JSON.stringify(data.refresh.user))
                dispatch(getUser(data.refresh.user))

                // if (data.refresh.errors) {
                //     setUser(null)
                // }
            }).catch((e) => {
                console.log(e);
            })
        }
        setUserIsLoading(false)
    }, [])

    return (
        <header className={style.header}>
            <div className={style.header__container}>
                <div className={style.header__inner}>
                    <div className={style.header__left}>
                        <Link href={`/`}>
                            <a className={style.header__logo}>
                                <span className={style.fff}>Ani</span>JoJo
                            </a>
                        </Link>
                    </div>
                    <form className={style.header__form}>
                        <div ref={currentInput} className={style.header__form_box}>
                            <input style={{display: isMobileInput ? 'block' : ''}} className={style.header__input} value={value} onChange={e => setValue(e.target.value)} placeholder='Поиск аниме' />
                            <SearchOptions setIsMobileInput={setIsMobileInput} setValue={setValue} value={value} />
                            <button onClick={onNavigateSearch} className={style.header__button}><img src='/loop.svg' /></button>
                        </div>
                        <button style={{right: isMobileInput ? '10px' : ''}} onClick={isMobileInput ? onNavigateSearch : (e) => openIsMobileInput(e)} className={style.header__button_mobile}><img src='/loop.svg' /></button>
                    </form>
                    <div className={style.header__auth}>
                        {
                            userIsLoading ?
                                <p>...</p>
                                :
                                auth.user?.username ?
                                    <div onClick={() => dispatch(setSettingPopup(true))}>
                                        <a className={style.header__username}>{auth.user.username}</a>
                                    </div>
                                    :
                                    <Link href={`/login`}>
                                        <a>
                                            <button className={style.header__auth_button}>
                                                Войти
                                            </button>
                                        </a>
                                    </Link>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)