"use client"
import { GlobalContext, Ticket, User } from '@/components/GlobalContext'
import {
  BacklogIcon, CancelledIcon, DoneIcon, InProgressIcon, NoPriorityIcon, TodoIcon, LowIcon, MediumIcon, HighIcon, UrgentIcon, AddIcon, EditIcon, CircleIcon
} from '@/components/atoms/Icons'
import ShadowContainer from '@/components/atoms/ShadowContainer'
import Wrapper from '@/components/atoms/Wrapper'
import React, { useContext, useEffect } from 'react'

const Statuses: any = {
  "Backlog": {
    icon: <BacklogIcon />,
    title: 'Backlog',
  },
  "Todo": {
    icon: <TodoIcon />,
    title: 'Todo',
  },
  "In progress": {
    icon: <InProgressIcon />,
    title: 'In progress',
  },
  "Done": {
    icon: <DoneIcon />,
    title: 'Done',
  },
  "Cancelled": {
    icon: <CancelledIcon />,
    title: 'Cancelled',
  }
}

const Priorities: any = {
  "0": {
    icon: <NoPriorityIcon />,
    title: "No Priority",
  },
  "1": {
    title: "Low",
    icon: <LowIcon />
  },
  "2": {
    title: "Medium",
    icon: <MediumIcon />
  },
  "3": {
    title: "High",
    icon: <HighIcon />
  },
  "4": {
    title: "Urgent",
    icon: <UrgentIcon />
  },
}

const StatusOrder = ["Backlog", "Todo", "In progress", "Done", "Cancelled"]

const PriorityOrder = ["0", "1", "2", "3", "4"]


export default function DashBoard() {
  const { displayBy, tickets, users } = useContext(GlobalContext)
  const [Groups, setGroups] = React.useState<any>([])

  useEffect(() => {
    const groupSort = tickets.reduce((groups: any, ticket) => {
      if (displayBy.Grouping === 'Status') {
        if (groups[ticket.status]) {
          groups[ticket.status].push(ticket)
        } else {
          groups[ticket.status] = [ticket]
        }
      }
      else if (displayBy.Grouping === 'Priority') {
        if (groups[ticket.priority]) {
          groups[ticket.priority].push(ticket)
        } else {
          groups[ticket.priority] = [ticket]
        }
      }
      else if (displayBy.Grouping === 'User') {
        if (groups[ticket.userId]) {
          groups[ticket.userId].push(ticket)
        } else {
          groups[ticket.userId] = [ticket]
        }
      }
      return groups
    }, {})
    let Order: any;
    if (displayBy.Grouping === 'Status') {
      Order = StatusOrder
    }
    else if (displayBy.Grouping === 'Priority') {
      Order = PriorityOrder
    }
    else if (displayBy.Grouping === 'User') {
      Order = users.map((user: any) => user.id)
    }
    else Order = []

    let SortedGroups;

    if (displayBy.Grouping === 'User') {
      SortedGroups = Order.map((id: string) => {
        return {
          id,
          title: users.find((user: User) => user.id === id)?.name ?? id,
          icon: <UserIcon name={users.find((user: User) => user.id === id)?.name ?? id} available={users.find((user: User) => user.id === id)?.available ?? false} />,
          tickets: groupSort[id]
        }
      })
    }
    else if (displayBy.Grouping === 'Status') {
      SortedGroups = Order.map((id: string) => {
        return {
          id,
          ...(Statuses?.[id] ?? {}),
          tickets: groupSort[id]
        }
      })
    }
    else if (displayBy.Grouping === 'Priority') {
      SortedGroups = Order.map((id: string) => {
        return {
          id,
          ...(Priorities?.[id] ?? {}),
          tickets: groupSort[id]
        }
      })
    }
    else SortedGroups = []

    console.log(SortedGroups)

    setGroups(SortedGroups)

  }, [displayBy, tickets, users])

  return (
    <Wrapper className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[15px] h-[calc(100vh-70px)] overflow-y-auto py-4'>
      {Groups?.map((group: any) => <TicketColumn key={group.id} title={group.title} icon={group.icon} tickets={group.tickets?.sort((a: Ticket, b: Ticket) => {
        if (displayBy.Ordering === 'Priority') {
          return (a.priority > b.priority) ? -1 : 1
        }
        else if (displayBy.Ordering === 'Title') {
          return (a.title < b.title) ? -1 : 1
        }
        else return 0
      })} />)}
    </Wrapper>
  )
}

const UserIcon = ({ name, available }: { name: string; available: boolean }) => {
  const colors: any = {
    0: '#01befe',
    1: '#ffdd00',
    2: '#ff7d00',
    3: '#ff006d',
    4: '#adff02',
    5: '#8f00ff',

  }
  return (
    <div className='w-[15px] h-[15px] rounded-full text-white text-center text-[12px] flex items-center justify-center relative'
      style={{ backgroundColor: colors[name[0].charCodeAt(0) % 6] }}
    >
      {name[0]}
      <div className="h-[5px] w-[5px] absolute right-0 bottom-0 outline-1 rounded-full" style={{ background: available ? 'rgb(236, 194, 56)' : 'gray' }}></div>
    </div >
  )
}

const TicketColumn = ({ title, icon, tickets }: { title: string, icon: any, tickets: any[] }) => {
  return <div className='w-full flex flex-col gap-2'>
    <div className='flex justify-between items-center h-[8vh] px-2'>
      <div className='flex items-center gap-[7px]'>
        {icon}
        <p className='font-semibold'>{title}  </p>
        <p className='font-normal text-heading'>{tickets?.length ?? 0}</p>
      </div>
      <div className='flex items-center'>
        <AddIcon />
        <EditIcon />
      </div>
    </div>
    <div className='flex flex-col gap-3'>
      {tickets?.map((ticket: any) => <TicketCard key={ticket.id} ticket={ticket} />)}
    </div>
  </div>
}

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const { users } = useContext(GlobalContext)
  return <ShadowContainer className='!px-[1.2rem] !py-[0.8rem] flex flex-col gap-2'>
    <div className='flex justify-between'><p className='text-heading'>{ticket.id}</p><div className='w-[16px]'><UserIcon name={users.find((user: User) => user.id === ticket.userId)?.name ?? ticket.userId} available={users.find((user: User) => user.id === ticket.userId)?.available ?? false} /></div></div>
    <div className='flex items-start gap-[7px]'><div className='w-[16px] pt-1'>{Statuses[ticket.status].icon}</div> <p>{ticket.title}</p></div>
    <div className='flex gap-2'>
      <div className='p-1 w-[26px] rounded border border-heading flex justify-center items-center'>
        {Priorities[ticket.priority].icon}
      </div>
      <div className='p-1 rounded border border-heading flex gap-1 justify-start items-center'>
        <CircleIcon /> <p className='text-[0.8rem]'>Feature request</p>
      </div>
    </div>
  </ShadowContainer>
}