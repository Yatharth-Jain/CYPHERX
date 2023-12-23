"use client"
import './globals.css'
import GlobalContextProvider from '@/components/GlobalContext'
import Layout from '@/components/Layout'

import 'react-toastify/dist/ReactToastify.css';

// export const metadata: Metadata = {
//   title: 'CYPHERX',
//   description: 'A Online Dashboard',
// }

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
