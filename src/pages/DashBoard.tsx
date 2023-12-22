"use client"
import { BacklogIcon } from '@/components/atoms/Icons'
import Wrapper from '@/components/atoms/Wrapper'
import React from 'react'

export default function DashBoard() {
  const Statuses = {
    "Backlog": {
      icon: <BacklogIcon />,
      title: 'Backlog',
    },
    "Todo": {
      icon: <BacklogIcon />,
      title: 'Todo',
    },
    "In progress": {
      icon: <BacklogIcon />,
      title: 'In progress',
    },
    "Done": {
      icon: <BacklogIcon />,
      title: 'Done',
    },
    "Cancelled": {
      icon: <BacklogIcon />,
      title: 'Cancelled',
    }
  }

  const groups = [
    {
      icon: <BacklogIcon />,
      title: 'Backlog',
      tasks: []
    }

  ]
  return (
    <Wrapper className='grid grid-cols-5 gap-[15px] h-[calc(100vh-70px)] overflow-y-auto'>
      Hello
    </Wrapper>
  )
}