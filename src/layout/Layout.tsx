import Head from 'next/head'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import Header from '../components/header/Header'

type LayoutProps = {
    children: ReactNode
    title: string
}

const Layout: FC<LayoutProps> = ({ children, title }) => {
  

    return (<div className='layout'>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{title}</title>
            <meta name="description" content="AniJoJo" />
            <link rel="shortcut icon" href="/fav.ico" type="image/x-icon" />
        </Head>
        <Header />
        <div>
            {children}
        </div>
    </div>)
}

export default Layout