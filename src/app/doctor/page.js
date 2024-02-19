
"use client";
import React, { useEffect, useState } from "react";
import ManagePatients from '@/Components/doctor/ManagePatients'

import io from 'socket.io-client';
import withAuth from "@/Components/auth/withAuth";

function page() {


  useEffect(() => {
    const socket = io('http://localhost:3000');

    // Connect event
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Message event
    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Handle the received message as needed
    });

    // Send a message
    const sendMessage = (message) => {
      socket.emit('message', message);
    };

    // Example usage
    sendMessage('Hello, server!');

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
        <h1 className=' font-bold text-2xl flex justify-center underline mt-5 mb-16'>Doctor Dashboard</h1>
       <div className='mx-10 my-10 min-h-screen  '><ManagePatients/></div> 
    </div>
  )
}

export default withAuth(page)