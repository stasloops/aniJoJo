import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../layout/Layout'
import { LOGOUT, UPDATE } from '../mutations/user'
import { resetUser } from '../store/reducers/auth/authSlice'
import style from '../styles/profile.module.scss'
import { useRouter } from 'next/router';

const Profile = () => {
    const auth = useSelector((state) => state.auth)
    const [imgValue, setImgValue] = useState(null)
    const [imgURL, setImgURL] = useState('')
    const [logout] = useMutation(LOGOUT)
    const [updAvatar] = useMutation(UPDATE)
    const disaptch = useDispatch()
    const router = useRouter()

    if (typeof window !== "undefined") {
        const fileReader = new window.FileReader();
        fileReader.onload = () => {
            setImgURL(fileReader.result);
        };
    }

    const handleImg = (event) => {
        // fileReader.readAsDataURL(event.target.files[0])
        setImgValue(event.target.files[0])
    }

    const getAndTransformImage = () => {
        // const userData = localStorage.getItem('user')
        // const userParse = JSON.parse(userData)
        // if (userParse.avatar) {
        //     console.log('twoa', userParse.avatar);
        //     fileReader.readAsDataURL(userParse.avatar)
        // }
    }


    useEffect(() => {
        getAndTransformImage()
    }, [imgValue])


    useEffect(() => {
        try {
            const avatar = imgValue || null
            
            if (avatar) {
                updAvatar({
                    variables: {
                        input: {
                            userid: auth.user.id,
                           avatar
                        }
                    }
                }).then(({ data }) => {
                    console.log(data);
                }).catch((e) => {
                    console.log(e);
                })
            }
        } catch (e) {
            console.log(e);
        }
    }, [imgValue])


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
                    disaptch(resetUser())
                    router.push('/')
                }
            }).catch((e) => {
                console.log(e);
            })
        }
    }
    return (
        <Layout title={`Профиль`}>
            <div className={style.profile}>
                <div className={style.profile__container}>
                    <div className={style.profile__inner}>
                        {/* <div className={style.profile__logo}>
                            ?
                        </div> */}
                        <p>{imgURL}</p>
                        <img className={style.profile__logo_img} src={imgURL} alt="нету" />
                        <label htmlFor="input_file" className={style.profile__logo_select}>
                            Изменить фото
                        </label>
                        <input id="input_file" className={style.profile__logo_hidden} onChange={(event) => handleImg(event)} accept="image/*" type="file" />
                        <h2 className={style.profile__username}>{auth.user?.username}</h2>
                        <button onClick={logOut} className={style.profile__logout}>
                            <span className={style.profile__logout_text}>
                                Выйти
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile