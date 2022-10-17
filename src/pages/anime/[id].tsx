import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useSvg } from '../../hooks/useSvg'
import Layout from '../../layout/Layout'
import { URL_SEARCH } from '../../request'
import style from '../../styles/animePage.module.scss'
import { AnimeProps, KodikProps } from '../../type/type'
import Image from 'next/image'

type AnimePageProps = {
    anime: AnimeProps
}

const AnimePage: FC<AnimePageProps> = ({ anime }) => {
    const [animeLink, setAnimeLink] = useState<string>()
    const [isAdd, setIsAdd] = useState<string>('no')
    const { query } = useRouter()
    const { svg } = useSvg()

    const fetchLink = async () => {
        const res = await axios.get(`https://kodikapi.com/search?token=30ef128890b06e03700a3628b91c87c2&id=${query.param}&with_material_data=true`)
        setAnimeLink(res.data.results[0].link)
    }
    console.log(anime);

    useEffect(() => {
        if (query) {
            fetchLink()
        }
    }, [query])

    const getFavorite = () => {
        const favorite: any = localStorage.getItem('favorite') ? localStorage.getItem('favorite') : '[]'
        const parse = JSON.parse(favorite)
        const filter = parse.filter((item: AnimeProps) => item?.id === anime?.id)
        if (filter[0]) {
            setIsAdd('yes')
        }
        return {
            parse,
            filter
        }
    }

    useEffect(() => {
        getFavorite()
    }, [])

    const addInFavorite = () => {
        const { parse, filter } = getFavorite()
        setIsAdd(isAdd === 'no' ? 'yes' : 'no')

        if (filter[0]) {
            const a = filter[0]
            const index = parse.indexOf(a)
            parse.splice(index, 1)
            return localStorage.setItem('favorite', JSON.stringify(parse))
        }

        parse.push(anime)
        localStorage.setItem('favorite', JSON.stringify(parse))
    }

    return (<>
        <Layout title={`${anime.material_data?.title} ${anime.last_season ? '(' + anime.last_season + ' cезон)' : ''} смотреть онлайн — Аниме`} >
            <div className={style.anime__back_filter}>
            </div>
            <img src={anime.material_data?.poster_url} className={style.anime__background} />
            <div className={style.anime}>
                <div className={style.anime__container}>
                    <div className={style.anime__inner}>
                        <div className={style.anime__info}>
                            <div className={style.anime__left}>
                                <img className={style.anime__img} src={anime.material_data?.poster_url} alt='anime poster' />
                                <button
                                    style={{ backgroundColor: isAdd === 'yes' ? '#cae962' : '#202125' }}
                                    onClick={() => addInFavorite()}
                                    className={style.anime__my}
                                >
                                    <span
                                        style={{ color: isAdd === 'yes' ? '#202125' : '#fff' }}
                                    >
                                        {isAdd === 'yes' ? 'Удалить из' : 'Добавить в '}
                                    </span>
                                    <span
                                        style={{ color: isAdd === 'yes' ? '#202125' : '#cae962' }}
                                        className={style.anime__my_svg}
                                    >
                                        {svg.favorite}
                                    </span>
                                </button>
                            </div>
                            <div className={style.anime__content}>
                                <h1 className={style.anime__title}><span className={style.cae962}>{anime.material_data?.title}</span> <span className={style.list__card_episodes}>{anime.last_season ? " сезон " + anime?.last_season : ""} </span></h1>
                                <p className={style.anime__description}>{anime.material_data?.anime_description}</p>
                                <div className={style.anime__genres}><span>Жанры: </span>
                                    <span>
                                        {
                                            anime.material_data?.anime_genres.map((item, id) => (
                                                <span key={id}>
                                                    <span className={style.anime__genres_item}>{item}</span><span className={style.anime__b}>,</span>
                                                </span>
                                            ))
                                        }
                                    </span>
                                </div>
                                <span className={style.anime__year}>Год: {anime.year}</span>
                            </div>
                        </div>
                        <strong className={style.anime__video_title}>Смотреть аниме «<span className={style.cae962}>{anime.material_data?.title}</span>» онлайн</strong>
                        <iframe className={style.anime__video} src={animeLink}
                            allow="autoplay; fullscreen"
                        ></iframe>
                    </div>
                </div>
            </div>
        </Layout>
    </>)
}

export default AnimePage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const response = await axios.get<KodikProps>(`${URL_SEARCH}&id=${query.param}&with_material_data=true`)
    const anime: AnimeProps = response.data.results[0]
    return {
        props: { anime }
    }
}
