"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from 'socket.io-client';
import { notify } from '@/toast';
import withAuth from "@/Components/auth/withAuth";
const page = () => {
  const socket = io('http://localhost:3000');
    const router=useRouter()
  const path = usePathname();
  const doctorIndex = path.indexOf("doctor/");
  const patientId =
    doctorIndex !== -1 ? path.slice(doctorIndex + "doctor/".length) : "";
    
    const [medicines, setMedicines] = useState([{ name: '', description: '' }]); 
    const [doctor,setDoctor] = useState({})
     const [apointment, setApointment] = useState({});
  const [patient, setPatient] = useState({});


 



  useEffect(() => {
    const fetchAppointment = async () => {
      if (typeof window !== 'undefined') {
      try {
    
        if (patientId) {
          const token = localStorage.getItem("token"); // Replace with your actual token value
  
          // Fetch patient data using the patientId and token
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/patientforprescription/${patientId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data;
          console.log(data)
  
          if (data.patient) {
            // Check if patient data is available
            setPatient(data.patient);
          }
          
          if(data.doctorDetail){

            setDoctor(data.doctorDetail)
          }
        }
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    }};
  
    fetchAppointment();
  }, [patientId]);

  const handleMedicineChange = (index, name) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].name = name;
    setMedicines(updatedMedicines);
  };
  const handleDescriptionChange = (index, description) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].description = description;
    setMedicines(updatedMedicines);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', description: '' }]);
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    const prescriptionData = {
      patientId: patient.patientId,
      pfirstname: patient.firstname,
      plastname: patient.lastname,
      dfirstname:  doctor.firstname,
      dlastname: doctor.lastname,
      patientAge: patient.age,
      medicines: medicines,
      
    };
    // console.log(prescriptionData)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/doctor/create/prescription`, prescriptionData);
      console.log('Prescription created:', response.data);
      socket.emit('newPrescription', response.data);

     if (response.status === 200) {
      // notify(`prescription generated for patient ${patient.firstname} ${patient.lastname}`,"success");
    router.push('/doctor');
  } else {
    console.error('Error creating prescription:', response.data);
  }
    } catch (error) {
      console.error('Error creating prescription:', error);
    }
  };

 
  return (
    <div className="flex mx-auto max-w-4xl  pb-12">
      <div className="p-4  w-full mt-10">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold underline">Patient Name: {patient.firstname} {patient.lastname}</h2>
          <h2 className=" underline">Patient Number: {patient.patientId}</h2>
          <h2 className=" underline">Age: {patient.age}</h2>
        </div>

<div className=" mt-16">
    <h2 className="text-lg font-bold underline">
        Add Medicines 
    </h2>
</div>
<div className="mt-10 flex flex-col mx-auto">
        <form   onSubmit={handleSubmit}>
        {medicines.map((medicine, index) => (
  <div key={index} className="mb-4 flex gap-5">
    <input
      type="text"
      className="p-2 border border-gray-300 rounded"
      placeholder="Medicine Name"
      value={medicine.name}
      onChange={(e) => handleMedicineChange(index, e.target.value)}
    />
    <input
      type="text"
      className="p-2 border border-gray-300 rounded"
      placeholder="Medicine Description"
      value={medicine.description}
      onChange={(e) => handleDescriptionChange(index, e.target.value)}
    />
  </div>
))}

          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAddMedicine}
          >
            Add More Medicine
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded ml-4"
          >
            Submit Prescription
          </button>
        </form></div>
      </div>
    </div>
  );
};

export default withAuth(page);
