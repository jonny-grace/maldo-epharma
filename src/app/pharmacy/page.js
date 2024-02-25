'use client';

import ManagePatients from '@/Components/pharmacy/ManagePatients'

import withAuth from '@/Components/auth/withAuth';
import Dashboard from '@/Components/reception/Dashboard';
// import ManagePatients from '@/Components/reception/ManagePatients';
import Prescriptions from '@/Components/pharmacy/Prescriptions';
import Sidebar from '@/Components/reception/SideBar';
import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { notify } from '@/toast';
import { showNotification } from '@/Components/BrowserNotification';
import { useRouter } from 'next/navigation'

function page() {
  const [data,setData]=useState({})
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  // const socket = io();
 const socket =io(`${api_url}`, {
  path: "/socket.io",transports: [ "websocket" ]
});
  
  const router = useRouter();
  let userData;
  let userId;
  let token;
  if (typeof window !== 'undefined') {
   userData = JSON.parse(localStorage.getItem('userData'));
   userId = userData && userData.userId;
   token = localStorage.getItem('token');
  }

  // console.log(userId)
  useEffect(() => {
    if(!token){
      router.push('/')
    }
    socket.on('connect', () => {
      console.log('Connected to server pharmacy');
    });
    // Listen for the newPrescription event
    socket.on('newPrescription', (data) => {
      // console.log('Received new prescription:', data);
      setData(data)
      if( data.pharmaciesId.includes(userId)){
      notify('you have a new prescription to check',"success");

      showNotification("New prescription generated to check");
     }
      
      // Handle the received prescription data in the frontend as needed
    });
    socket.on('timerFinished', (data) => {
      // console.log('Received new prescription:', data);
      setData(data)
      if( data.pharmaciesId.includes(userId)){
      notify('times up for prescription',"success");
      router.replace(router.route)
      ;
     }
      
      // Handle the received prescription data in the frontend as needed
    });
    
    socket.on('AcceptedPharmacy', (data) => {

      if(data.pharmacyId=userId){
        showNotification(`your prescription has been accepted please check the orders tab`);
      }
     console.log('accepted prescription:', data);
      // Handle the received prescription data in the frontend as needed
    });

    socket.on('rejectedPharmacy', (data) => {
      
      if( data.pharmaciesIds.includes(userId)){
      // notify('you have a new prescription to check',"success");

      showNotification(`your prescription has been rejected`);;
     }
      
      // Handle the received prescription data in the frontend as needed
    });


    return () => {
      // Clean up the event listener when the component unmounts
      socket.off('newPrescription');
    };
  }, []);


  const [activeOption, setActiveOption] = useState('Presciptions');

  const options = [
    {
      name: 'Dashboard',
      component: <Dashboard />
    },
    {
      name: 'Presciptions', 
      component: <ManagePatients />
    },
    {
      name: 'Orders',
      component: <Prescriptions />
    },
    // {
    //   name: 'Logout',
    // }
  ];

  const handleOptionClick = (option) => {
    setActiveOption(option);
  }

  return (
    <div className="flex h-screen">
      <Sidebar 
        options={options}
        activeOption={activeOption}
        onOptionClick={handleOptionClick} 
      />

      <MainContent>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

        {options.find(o => o.name === activeOption)?.component}  
      </MainContent>
    </div>
  );
}



function MainContent({children}) {
  return (
    <div className="flex-1 p-5">
      {children}
    </div>
  );
}

export default page;