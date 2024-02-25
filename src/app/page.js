'use client'
import { useEffect, useState } from 'react';

import Login from "@/Components/auth/Login";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import io from 'socket.io-client';

export default function Home() {

  const [socket, setSocket] = useState();
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const newSocket = io(`${api_url}`); 

    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO server!');  
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <main className="flex min-h-screen">
      <Login />
      
      <ToastContainer />
    </main>
  );
}