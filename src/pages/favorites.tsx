import React, { useEffect, useState } from 'react'
import style from '../styles/favorites.module.scss'
import Link from 'next/link'
import Layout from '../layout/Layout'
import { AnimeProps } from '../type/type'

const Favorites = () => {
  const [favoriteAnime, setFavoriteAnime] = useState<AnimeProps[]>([])

  useEffect(() => {
    const favorites: any = localStorage.getItem('favorite')
    const parse = JSON.parse(favorites)
    setFavoriteAnime(parse)
  }, [])

  return (
    <Layout title={`Мои Аниме`}>
      <main className={style.favorite}>
        <div className={style.favorite__container}>
          <div className={style.favorite__inner}>
            <div className={style.favorite__cards}>
              {
                favoriteAnime?.length ?
                  favoriteAnime?.map((item, id) => (
                    <Link key={`${item?.id}-${id}`} href={{
                      pathname: `/anime/${item?.material_data?.title_en}`,
                      query: { param: `${item?.id}` },
                    }} >
                      <a className={style.favorite__card}>
                        <img className={style.favorite__card__img} src={item?.material_data?.poster_url} alt='favorite poster' />
                        <div className={style.favorite__card__content}>
                          <h2 className={style.favorite__card__title}>{item?.material_data?.anime_title}</h2>
                          <span>
                            <span className={style.favorite__card__episodes}>{item?.last_season === undefined ? "" : item?.last_season + " сезон"} </span>
                            <span className={style.favorite__card__episodes}>{item?.material_data?.anime_kind === "movie" ? "Фильм" : item?.material_data?.anime_kind === 'tv' ? 'TV сериал' : item?.material_data?.anime_kind === 'ova' ? 'OVA' : 'Спешл'}</span>
                          </span>
                        </div>
                      </a>
                    </Link>
                  ))
                  :
                  <div>Здесь пока ничего нет.</div>
              }
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Favorites