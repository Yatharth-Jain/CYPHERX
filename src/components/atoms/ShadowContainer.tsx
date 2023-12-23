import { ThemeColors } from '../Layout';
import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext';

export default function ShadowContainer(props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const { theme } = useContext(GlobalContext)
  return (
    <div
      {...props}
      className={`py-4 px-5 rounded-md ${theme == 'light' ? 'shadow-dark-around' : 'shadow-light-around'} ${props?.className}`}
      style={{
        background: ThemeColors[theme].NavbarBackground,
        color: ThemeColors[theme].NavbarColor,
      }}
    >
      {props.children}
    </div>
  )
}
