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
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  refresh: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
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
  setDisplayBy: () => { },
  loading: true,
  setLoading: () => { },
  refresh: true,
  setRefresh: () => { }
});

export default function GlobalContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [tickets, setTickets] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)
  const [displayBy, setDisplayBy] = useState<{
    Grouping: 'Status' | 'Priority' | 'User';
    Ordering: 'Priority' | 'Title';
  }>({
    Grouping: "Status",
    Ordering: "Priority"
  })
  const API_URL = process?.env?.NEXT_PUBLIC_API_URL ?? ""

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme') === 'dark') {
        setTheme('dark')
      }
      if (localStorage.getItem('displayBy')) {
        setDisplayBy(JSON.parse(localStorage.getItem('displayBy') ?? "{}"))
      }
    }
  }, [])

  useEffect(() => {
    if (!refresh) {
      setLoading(true)
      fetch(API_URL).then(res => res.json()).then(data => {
        console.log(data)
        setTickets(data.tickets)
        setUsers(data.users)
        setLoading(false)
        toast.success("Tickets and users Fetched")
      }).catch((err) => {
        console.log(err)
        setLoading(false)
        setRefresh(true)
        toast.error("Error Fetching Tickets and users")
      })
    }
  }, [refresh])

  return (
    <GlobalContext.Provider value={{ theme, setTheme, tickets, users, displayBy, setDisplayBy, loading, setLoading,refresh, setRefresh }}>
      {children}
    </GlobalContext.Provider>
  );
}