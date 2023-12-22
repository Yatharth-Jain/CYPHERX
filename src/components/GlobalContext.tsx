"use client"
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const data = {
  "id": "usr-1",
  "name": "Anoop sharma",
  "available": false
}
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
}


export const GlobalContext = createContext<GlobalContextProps>({
  theme: "light",
  setTheme: () => { },
  tickets: [],
  users: []
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
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ""

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
    <GlobalContext.Provider value={{ theme, setTheme, tickets, users }}>
      {children}
    </GlobalContext.Provider>
  );
}