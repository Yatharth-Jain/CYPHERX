import { ThemeColors } from '../Layout'
import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

export default function Wrapper(props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const { theme } = useContext(GlobalContext)
  return (
    <div {...props} className={`w-full px-10 ${props?.className}`} >
      {props?.children}
    </div >
  )
}
