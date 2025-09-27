import Header from './Header'
import { getAvailableLocales } from '@/lib/getLocales';
import React from 'react'

const layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const locales = getAvailableLocales()
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default layout