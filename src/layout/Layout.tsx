import Head from 'next/head'
import React, { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/header/Header'
import SettingPopup from '../popups/Setting'

type LayoutProps = {
    children: ReactNode
    title: string
}

const Layout: FC<LayoutProps> = ({ children, title }) => {
    const { settingPopup } = useSelector((state: any) => state.popup)
    return (<div className='layout'>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{title}</title>
            <meta name="description" content="AniJoJo" />
            <link rel="shortcut icon" href="/fav.ico" type="image/x-icon" />
        </Head>
        {
            settingPopup ?
                <SettingPopup />
                :
                null
        }
        <Header />
        <div>
            {children}
        </div>
    </div>)
}

export default Layout