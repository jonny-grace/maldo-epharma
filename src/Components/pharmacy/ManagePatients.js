'use client';
import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';
import { notify } from '@/toast';
import { toast } from 'react-hot-toast';

const ManagePatients = () => {
  const socket = io('http://localhost:3000');

  function showNotification(message, type) {
    toast[type](message, {
      duration: 5000, // 5 seconds
    });
  }

  const router = useRouter();
const [prescriptions,setPrescriptions]=useState([]);
const [appointments,setAppointments]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token'); 
        // Get the token from localStorage
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pharmacy/prescriptionss`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        const data = await response.json();
            console.log(data)
           setPrescriptions(data);
          
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
  
    fetchPrescriptions();
  }}, []);

 
    // Listen for the "prescriptionAccepted" event
    socket.on("prescriptionAccepted", ({ numberleft }) => {
      // Handle the notification for the accepted prescription
      // console.log("Prescription accepted:", numberleft);
      // Display a notification, update UI, etc.
      // showNotification(`new accept is responded by another phamacy  `,"success");

      // Reload the page
      window.location.reload();
    });

   // Empty dependency array ensures the effect runs only once on mount

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

;
// const filteredPrescriptions =[]
  const filteredPrescriptions = prescriptions.filter((prescription) =>
    `${prescription.patientFullName} ${prescription.doctorFullName} ${prescription.age} `
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

const viewPrescriptionDetail = async (prescriptionId) => {
  router.push(
         `/pharmacy/${prescriptionId}`,
        );
    }


const createAppointment = async (apointment) => {
  
  const doctor = doctors.find(
    (doctor) => `${doctor.firstname} ${doctor.lastname}` === doctorFullName
  );

  const url = `${process.env.NEXT_PUBLIC_API_URL}/reception/create/appointment`;
  const data = {
    PID: patientId,
    doctorId: doctor.userId
  };
  console.log(data)
  try {
    const response = await axios.post(url, data);
    // Handle success
    // console.log('Appointment created successfully');
    
    if(response.data.message==='successfully appointed'){
        // setHasApointment(true);
        console.log('Appointment created successfully',response.data.doctor);
    }
  } catch (error) {
    // Handle errors
    console.error('Error creating appointment:', error);
  }

  setShowAppointmentModal(false);
};

const handlePrint = (prescriptionId) => {
  // Logic for printing the prescription
  router.push(`print/${prescriptionId}`);
};

  
  return (
    <div>
      <div className="flex justify-between mb-4 ">
      
        
        <div></div>
        <div >
    <input type="text" className="w-72 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
    placeholder="Search patients..."
    value={searchTerm}
    onChange={handleSearch} />
</div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Patient Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Doctor Name
            </th>
           
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Patient Age
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              response
            </th>
            <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
            {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th> */}
           
          </tr>
        </thead>
        <tbody>
          {prescriptions.length<=0&&<tr><td>No appointment found</td></tr>}
          {filteredPrescriptions.map((prescription,index) => (
            
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {prescription.patientFullName}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {prescription.doctorFullName} 
              </td>
             
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {prescription.patientAge}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {prescription.acceptStatus}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {prescription.responseCounter}
              </td>
              
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                
                {prescription.status!== 'completed' ?
                
                prescription.acceptStatus != 'waiting' ?
                  <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => viewPrescriptionDetail(prescription._id)}
                >
                 View Detail
                </button>
                :<h1 className=' italic'>waiting for patient response</h1>

                                :
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handlePrint(prescription.prescriptionId)}
              >
               print
              </button>
                }
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default ManagePatients;