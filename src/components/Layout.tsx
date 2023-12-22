"use client"
import React, { useContext } from 'react'
import Navbar from './Navbar'
import { GlobalContext } from './GlobalContext'
import { ThemeColors } from '@/app/layout'

export default function Layout({ children }: { children: React.ReactNode }) {
    const { theme } = useContext(GlobalContext)
    return (
        <body className='h-screen w-screen grid-rows-[70px_1fr]'>
            <Navbar />
            <div className='h-[calc(100%-70px)]' style={{ background: ThemeColors[theme].BodyBackground, color: ThemeColors[theme].BodyColor }}>
                {children}
            </div>
        </body>

    )
}
