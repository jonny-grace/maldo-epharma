'use client';
import withAuth from '@/Components/auth/withAuth';
import Dashboard from '@/Components/Admin/Dashboard';
import Sidebar from '@/Components/reception/SideBar';
import { useState } from 'react';
import ManagePharmacies from '@/Components/Admin/ManagePharmacies';
import Managereceptions from '@/Components/Admin/ManageReception';
import ManageDoctors from '@/Components/Admin/ManageDoctors';


function page() {
  const [activeOption, setActiveOption] = useState('Dashboard');

  const options = [
    {
      name: 'Dashboard',
      component: <Dashboard />
    },
    {
        name: 'Manage_Pharmacy',
        component: <ManagePharmacies />
      },
      {
        name: 'Manage_Doctors', 
        component: <ManageDoctors />
      },
    {
      name: 'Manage_Receptions', 
      component: <Managereceptions />
    },

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

export default withAuth(page);