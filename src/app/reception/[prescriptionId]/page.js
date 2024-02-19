"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

function PrescriptionDetail() {
  const router = useRouter();
  const path = usePathname();
  const doctorIndex = path.indexOf("reception/");
  const prescriptionId =
    doctorIndex !== -1 ? path.slice(doctorIndex + "reception/".length) : "";

  const [prescription, setPrescription] = useState({});
  const [pharmaciesResponse, setPharmaciesResponse] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const pharmacyIds=[]
 
  useEffect(() => {
    const fetchApointment = async () => {
      try {
        if (prescriptionId) {
          // Check if prescriptionId is available
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/reception/prescription/${prescriptionId}`
          );
          const data = await response.json();
          console.log("data", data);
          setPrescription(data.prescription);

          // setMedicines(data.medicines);
          setPharmaciesResponse(data.pharmacyresponse);
        }
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchApointment();
  }, [prescriptionId]);

  // console.log("pharmaciesResponse", pharmaciesResponse);

  const handlePrint = () => {
    // Logic for printing the prescription
    router.push(`print/${prescriptionId}`);
  };

  const handlereject = () => {
    console.log("Rejecting prescription :", prescriptionId);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/reception/reject/${prescriptionId}`
      )
      .then((response) => {
        console.log(response.data);
        router.push("/reception");
        // Handle the response data here
      })
      .catch((error) => {
        console.error(error);
        // Handle any errors that occur during the request
      });
  };

  const handleAccept = (selectedPharmacyId, prescriptionId) => {
    const pharmaciesIdsexprectcurrent = pharmacyIds.filter(
      (pharmacyId) => pharmacyId != selectedPharmacyId
    );
  
    const requestBody = {
      pharmacyId: selectedPharmacyId,
      pharmaciesIds: pharmaciesIdsexprectcurrent,
      patientId:prescription.patientId
    };
  
    axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/reception/pharmacySelectedByPatient/${prescriptionId}`,requestBody
    )
      // .post(`${process.env.NEXT_PUBLIC_API_URL}/reception/pharmacySelectedByPatient/${prescriptionId}`, requestBody)
      .then((response) => {
        console.log(response.data);
        router.push("/reception");
      })
      .catch((error) => {
console.log(error)      });
  };

  return (
    <div className="bg-white max-w-6xl mx-auto my-6 border border-black border-opacity-30 rounded shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Prescription</h2>
      <div className="flex flex-col md:flex-row gap-16">
        <div className="mb-6">
          <p className="font-bold">Patient Name:</p>
          <p>{prescription.patientFullName}</p>
        </div>
        <div className="mb-6">
          <p className="font-bold">Patient ID:</p>
          <p>{prescription.patientId}</p>
        </div>
        <div className="mb-6">
          <p className="font-bold">Patient Age:</p>
          <p>{prescription.patientAge}</p>
        </div>
      </div>
      <div className="mb-6">
        <p className="font-bold">Doctor Name:</p>
        <p>{prescription.doctorFullName}</p>
      </div>
      <h3 className="text-lg font-bold mb-2">
          List of pharmacies Response
        </h3>

    <div className="">{ pharmaciesResponse.length === 0 ? "No pharmacy response yet" :
      pharmaciesResponse.map((response, index) => {
        // console.log(response)
        const medicines = response.medicines;
        pharmacyIds.push(response.pharmacyId)
     
     return(
      <div className=" my-3" key={index}>
        <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">
        Pharmacy Name: <span className=" font-semibold">{response.pharmacyName}</span>
        </h3>
      
        <div className=" flex justify-between mx-8 ">
          <h2 className=" underline pb-3">Medicine Name</h2>
          <h2 className=" underline pb-3">Medicine Description</h2>
          <h2 className=" underline pb-3">Medicine Price</h2>
        </div>
        <div className=" flex flex-col gap-4">
          {medicines.map((medicine, index) => (
            <div key={index}>
              <div className=" flex justify-between border-b-2   mx-8">
                <p className="font-bold text-left  w-[250px]">
                  {medicine.name}
                </p>

                <div className=" b w-[450px]">
                  <p className=" text-left ">{medicine.description}</p>
                </div>
                <p className="">{medicine.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={()=>handleAccept(response.pharmacyId,prescriptionId)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
        >
          Accept
        </button>

        
      </div>
      </div>
     )   
      }) 
    }</div>
    </div>
  );
}

export default PrescriptionDetail;
