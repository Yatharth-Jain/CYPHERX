import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GlobalContextProvider from '@/components/GlobalContext'
import Layout from '@/components/Layout'

import 'react-toastify/dist/ReactToastify.css';

// export const metadata: Metadata = {
//   title: 'CYPHERX',
//   description: 'A Online Dashboard',
// }

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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GlobalContextProvider>
      <html lang="en">
        <Layout>
          {children}
        </Layout>
      </html>
    </GlobalContextProvider>
  )
}
