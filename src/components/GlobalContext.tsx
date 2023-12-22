"use client"
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export type Ticket = {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
}

export type User = {
  id: string;
  name: string;
  available: boolean;
}

interface GlobalContextProps {
  theme: "light" | "dark"
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>
  tickets: Ticket[],
  users: User[]
  displayBy: {
    Grouping: 'Status' | 'Priority' | 'User';
    Ordering: 'Priority' | 'Title';
  };
  setDisplayBy: React.Dispatch<React.SetStateAction<{
    Grouping: 'Status' | 'Priority' | 'User';
    Ordering: 'Priority' | 'Title';
  }>>
}


export const GlobalContext = createContext<GlobalContextProps>({
  theme: "light",
  setTheme: () => { },
  tickets: [],
  users: [],
  displayBy: {
    Grouping: "Status",
    Ordering: "Priority"
  },
  setDisplayBy: () => { }
});

export default function GlobalContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as ('light' | 'dark' | undefined) ?? 'light')
  const [tickets, setTickets] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [refresh, setRefresh] = useState(false)
  const [displayBy, setDisplayBy] = useState<{
    Grouping: 'Status' | 'Priority' | 'User';
    Ordering: 'Priority' | 'Title';
  }>(localStorage?.getItem('displayBy') ? JSON.parse(localStorage.getItem('displayBy') ?? "{}") : {
    Grouping: "Status",
    Ordering: "Priority"
  })
  const API_URL = process?.env?.NEXT_PUBLIC_API_URL ?? ""

  useEffect(() => {
    localStorage.setItem('theme', theme)
    localStorage.setItem('displayBy', JSON.stringify(displayBy))
  }, [displayBy, theme])

  useEffect(() => {
    if (!refresh) {
      fetch(API_URL).then(res => res.json()).then(data => {
        console.log(data)
        setTickets(data.tickets)
        setUsers(data.users)
        toast.success("Tickets and users Fetched")
      }).catch((err) => {
        console.log(err)
        setRefresh(true)
        toast.error("Error Fetching Tickets and users")
      })
    }
  }, [refresh])

  return (
    <GlobalContext.Provider value={{ theme, setTheme, tickets, users, displayBy, setDisplayBy }}>
      {children}
    </GlobalContext.Provider>
  );
}