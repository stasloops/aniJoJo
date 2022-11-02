import React, { useState } from 'react'
import Layout from '../layout/Layout'
import style from '../styles/registration.module.scss'
import Link from "next/link"
import { useMutation } from "@apollo/client";
import { LOGIN } from '../mutations/user';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/reducers/auth/authSlice';
import { useRouter } from 'next/router';

const Login = () => {
    const [login] = useMutation(LOGIN)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)

    }

    const entryInAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        login({
            variables: {
                input: {
                    username, password
                }
            }
        }).then(({ data }) => {
            const res = data.login
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
        <Layout title={`Вход`}>
            <div className={style.registration}>
                <form className={style.registration__form}>
                    <h1 className={style.registration__title}>Вход</h1>
                    <input
                        value={username}
                        onChange={(e) => handleUsername(e)}
                        className={style.registration__input}
                        placeholder="Введите имя"
                    />
                    <input
                        value={password}
                        onChange={(e) => handlePassword(e)}
                        className={style.registration__input}
                        placeholder="Введите пароль"
                    />
                    {
                        error ?
                        <p className={style.registration__error}>{error}</p>
                        :
                        null
                    }
                    <button onClick={(e) => entryInAccount(e)} className={style.registration__button}>Войти</button>
                    <Link href={`/registration`}>
                        <a>
                            <button className={style.registration__button_two}>Создать Аккаунт</button>
                        </a>
                    </Link>
                </form>

            </div>
        </Layout>
    )
}

export default Login