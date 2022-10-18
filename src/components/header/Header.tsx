import Link from "next/link"
import { useRouter } from "next/router"
import { FC, memo, useState } from "react"
import { useSvg } from "../../hooks/useSvg"
import style from '../../styles/header.module.scss'
import SearchOptions from "../search-options/SearchOptions"

const Header: FC = () => {
    const [value, setValue] = useState<string>('')
    const router = useRouter()
    const { svg } = useSvg()

    const onNavigateSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (value.length > 0) {
            router.push(`/search/${value}`)
            setValue('')
        }
    }

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
                        <nav className={style.header__nav}>
                            <Link href={`/favorites`}>
                                <a className={style.header__nav_item}>
                                    <span style={{color: router.asPath === '/favorites' ? '#cae962' : ''}} className={style.header__svg}>{svg.favorite}</span>
                                    <span>Мои</span>
                                </a>
                            </Link>
                        </nav>
                    </div>
                    <form className={style.header__form}>
                        <input className={style.header__input} value={value} onChange={e => setValue(e.target.value)} placeholder='Поиск аниме' />
                        <SearchOptions setValue={setValue} value={value} />
                        <button onClick={onNavigateSearch} className={style.header__button}><img src='/loop.svg' /></button>
                    </form>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)