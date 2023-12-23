"use client"
import React, { useContext } from 'react'
import Navbar from './Navbar'
import { GlobalContext } from './GlobalContext'

export const ThemeColors = {
    'light': {
      NavbarBackground: '#fff',
      BodyBackground: '#f5f5f9',
      NavbarColor: '#373737',
      BodyColor: '#373737',
      border: '2px solid #e6e7eb'
    },
    'dark': {
      NavbarBackground: '#161B22',
      BodyBackground: '#010409',
      NavbarColor: '#ebebeb',
      BodyColor: '#ebebeb',
      border: '2px solid #4a4a4a'
    }
}

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
