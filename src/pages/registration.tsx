import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import style from '../styles/registration.module.scss'
import Link from "next/link"
import { useMutation } from "@apollo/client";
import { REGISTRATION } from '../mutations/user';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/reducers/auth/authSlice';
import { useRouter } from 'next/router';
import { setDefaultResultOrder } from 'dns';

const Registration = () => {
    const [registration] = useMutation(REGISTRATION)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)

    }

    const createUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(username.length < 3 || username.length > 12) {
            return setError('Имя, должно быть не меньше 3 и не более 12 символов')
        }
        if(password.length < 8 || password.length > 20){
            return setError('Пароль, должен быть не меньше 8 и не более 20 символов')
        }
        registration({
            variables: {
                input: {
                    username, password
                }
            }
        }).then(({ data }) => {
            const res = data.registration
            if (res.errors?.message) {
                return setError(res.errors.message)
            }
            dispatch(getUser(res.user))
            localStorage.setItem('token', JSON.stringify(res.tokens))
            localStorage.setItem('user', JSON.stringify(res.user))
            if (!res.errors) {
                router.push('/')
            }
        })
    }
    return (
        <Layout title={`Регистрация`}>
            <div className={style.registration}>
                <form className={style.registration__form}>
                    <h1 className={style.registration__title}>Регистрация</h1>
                    <input
                        value={username}
                        onChange={(e) => handleUsername(e)}
                        className={style.registration__input}
                        placeholder="Придумайте имя" />
                    <input
                        value={password}
                        onChange={(e) => handlePassword(e)}
                        className={style.registration__input}
                        placeholder="Создайте надежный пароль"
                    />
                    {
                        error ?
                        <p className={style.registration__error}>{error}</p>
                        :
                        null
                    }
                    <button onClick={(e) => createUser(e)} className={style.registration__button}>Создать</button>
                    <Link href={`/login`}>
                        <a className={style.registration__link}>
                            У вас уже есть аккаунт? Войти
                        </a>
                    </Link>
                </form>
            </div>
        </Layout>
    )
}

export default Registration