"use client"
import React, { useContext, useState } from 'react'
import { GlobalContext } from './GlobalContext'
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeColors } from '../app/layout';
import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import ShadowContainer from './atoms/ShadowContainer';
import Wrapper from './atoms/Wrapper';

export default function Navbar() {
  const { theme, setTheme } = useContext(GlobalContext)
  return (
    <Wrapper className='h-[70px] flex items-center justify-between' style={{
      background: ThemeColors[theme].NavbarBackground,
      color: ThemeColors[theme].NavbarColor,
  }}>
      <DisplayDropDownMenu />
      <div onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}>
        {theme == 'light' ? <FaMoon /> : <FaSun />}

      </div>
    </Wrapper>
  )
}

const DisplayDropDownMenu = () => {
  const { theme } = useContext(GlobalContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className='relative'>
      <ShadowContainer className='!py-1 !px-2 flex items-center gap-3 cursor-pointer' onClick={() => {
        setIsMenuOpen(!isMenuOpen)
      }}>
        <GiSettingsKnobs className="rotate-90" />
        <p>Display</p>
        <IoIosArrowDown className={`transition ${isMenuOpen && 'rotate-180'}`} />
      </ShadowContainer>
      {isMenuOpen &&
        <ShadowContainer className='absolute top-[125%] flex flex-col gap-3 w-[300px]'>
          <SelectMenu name='Grouping' label='Grouping' options={['Status', 'User', 'Priority']} theme={theme} />
          <SelectMenu name='Ordering' label='Ordering' options={['Priority', 'Title']} theme={theme} />
        </ShadowContainer>
      }
    </div>
  )
}

const SelectMenu = ({ name, label, options, theme }: {
  name: string; options: string[]; label: string; theme: 'light' | 'dark'
}) => {
  return (
    <div className='flex justify-between'>
      <label htmlFor={name} className='text-heading'>{label}</label>
      <select name={name} id={name} className='w-28 rounded border border-[#e6e7eb] pl-1' style={{
        background: ThemeColors[theme].NavbarBackground,
        color: ThemeColors[theme].NavbarColor,
      }}>
        {options?.map((option) =>
          <option key={option} value={option} style={{
            background: ThemeColors[theme].NavbarBackground,
            color: ThemeColors[theme].NavbarColor,
          }}>{option}</option>
        )}
      </select>
    </div>
  )
}