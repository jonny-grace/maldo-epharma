'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation'

const ManagePatients = () => {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSearch = async () => {
    if (!patientId) return;

    setLoading(true);

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/patient/${patientId}`);
      const data = response.data;
      console.log(response.data)
        if(response.data===null){
          setError('Patient not found');
          setLoading(false);
          setPatientId('');
        }else{
          setPatient(data);
          setError(null);
          setLoading(false);
        }
      ;
    } catch (error) {
      console.error('Error fetching patient:', error);
    }

   
  };

  const openCreatePrescription = (patientId) => {
    // Handle creating prescription for the patient
    console.log('Creating prescription for patient:', patientId);
    router.push(
      `/doctor/${patientId}`,
      );
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center  h-screen">
      <div className="mb-4">
        <input
          type="text"
          className="w-72 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter patient ID..."
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSearch}
          disabled={loading}
        >
          Find Patient
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : patient ? (
        <div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  PID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{patient.patientId}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{patient.firstname} {patient.lastname}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{patient.age}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{patient.address}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                 
                 {!patient.healed ?
                   <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => openCreatePrescription(patient.patientId)}
                  >
                    Create Prescription
                  </button> 
                  :<p className=' italic text-green-900'>the patient has an active progress</p>} 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Enter a patient ID and click 'Find Patient' or press Enter to search.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ManagePatients;