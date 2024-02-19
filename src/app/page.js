'use client'
import Login from "@/Components/auth/Login";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect } from 'react';
import GeoLocationComponent from "@/Components/GeoLocationComponent";



  function Home() {
   
    
  return (
    <main className="flex min-h-screen">
      
   <Login />
   <ToastContainer />
   {/* <GeoLocationComponent /> */}
    </main>
  );
}

export default Home
