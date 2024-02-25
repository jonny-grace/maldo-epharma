'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const Prescriptions = () => {
  const router = useRouter();
    const [prescriptions, setPrescriptions] = useState([
      
    ]);

    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      console.log("here");
      if (typeof window !== 'undefined') {
      const fetchPatients = async () => {
        try {

          const token = localStorage.getItem('token'); 
          // Get the token from localStorage
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pharmacy/orders`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          });

          // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pharmacy/prescriptionss`);
          const data = await response.json();
         
          console.log(data);
          // const filteredData = data.filter(prescription => prescription.pharmacy === "SAAS");
      setPrescriptions(data);
         
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };
  
      fetchPatients();
}}, []);
  
// console.log(setPrescriptions.length)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }; 

  const filteredPrescriptions = prescriptions.filter((prescription) =>
    `${prescription.patientName} ${prescription.doctorName} ${prescription.PID} ${prescription.pharmacy}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  
    const manangeViewDetail = (prescriptionId) => {
      router.push(`pharmacy/prescription/${prescriptionId}`);
    };
  
   
  
    return (<>
    <div className=' my-4 content-end flex justify-between' >
        <div></div>
    <input type="text" className="w-72 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
    placeholder="Search prescriptions..."
    value={searchTerm}
    onChange={handleSearch} />
</div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              PID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Patient Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Doctor Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            
            
            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          { filteredPrescriptions.length===0 ? <tr>no orders found here yet</tr> : filteredPrescriptions.map((prescription,index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {prescription.patientId}
              </td>
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
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => manangeViewDetail(prescription._id)}
                >
                  View
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
    );
  };
  
  export default Prescriptions;