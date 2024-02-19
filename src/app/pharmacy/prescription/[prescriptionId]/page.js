"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

function PrescriptionDetail() {
  const router = useRouter();
  const path = usePathname();
  const doctorIndex = path.indexOf("pharmacy/prescription/");
  const prescriptionId =
    doctorIndex !== -1
      ? path.slice(doctorIndex + "pharmacy/prescription/".length)
      : "";

  const [prescription, setPrescription] = useState({});
  const [patient, setPatient] = useState({});

  const [medicines, setMedicines] = useState([]);

  // lets get the day/month/year value from prescription.enddate
  const date = new Date(prescription.endTime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const enddate = `${day}/${month}/${year}`;

  useEffect(() => {
    const fetchApointment = async () => {
      if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem("token");
        // Get the token from localStorage

        if (prescriptionId) {
          // Check if prescriptionId is available
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/pharmacy/prescriptionn/${prescriptionId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              },
            }
          );
          const data = await response.json();
          // console.log("data", data);
          // console.log("data", data.medicines);

          setPrescription(data.prescription);
          setPatient(data.patient);

          setMedicines(data.medicines);
        }
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    }
    };

    fetchApointment();
  }, []);

  const handleAccept = async () => {
    setPriceVisible(true);
    if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/pharmacy/accept/${prescriptionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
  };
  const handlePrint = () => {
    window.print();
  };

  const handlereject = () => {
    router.push("/pharmacy");
    // Handle the response data here
  };

  return (
    <div className="bg-white max-w-6xl mx-auto my-6 border border-black border-opacity-30 rounded shadow-lg p-6">
      <div className="flex ">
        <div className="  ">
        <Image src="/assets/maldologo.jpg"  alt="logo" width={100} height={100} />
        </div>
        <div className=" w-full mx-auto flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold"> ማልዶ የውስጥ ደዌ ስፔሻሊቲ ክሊኒክ</h2>
        <h2 className="text-2xl font-bold">
          {" "}
          Maldo Internal Medicine Speciality Clinic
        </h2>
        <h2 className="text-2xl font-bold mb-4">Prescription Paper</h2>
      </div>
      </div>

      <p className=" flex justify-end mr-16 mb-8 mt-4">Date:{enddate}</p>
      <div className="mb-6">
        <p className=" font-normal">
          FullName{" "}
          <span className="underline">{prescription.patientFullName}</span>
        </p>
      </div>
      <div className="flex  md:flex-row gap-10">
        <div className="mb-6">
          <p className=" font-normal">
            Gender <span className=" underline">{patient.gender}</span>
          </p>
        </div>
        <div className="mb-6">
          <p className=" font-normal">
            Age <span className=" underline">{prescription.patientAge}</span>
          </p>
        </div>
        <div className="mb-6">
          <p className=" font-normal">
            Weight <span className=" underline">{patient.weight}</span>
          </p>
        </div>
        <div className="mb-6">
          <p className=" font-normal">
            Card No. <span className=" underline">{prescription.patientId}</span>
          </p>
        </div>
      </div>
      <div className="flex  md:flex-row gap-10">
        <div className="mb-6">
          <p className=" font-normal">
            Region <span className=" underline">{patient.region}</span>
          </p>
        </div>
        <div className="mb-6">
          <p className=" font-normal">
            Town <span className=" underline">{patient.town}</span>
          </p>
        </div>
        <div className="mb-6">
          <p className=" font-normal">
            Sub-City <span className=" underline">{patient.subCity}</span>
          </p>
        </div>
        {/* <div className="mb-6">
          <p className=" font-normal">
            Woreda <span className=" underline">{patient.woreda}</span>
          </p>
        </div> */}
      </div>

      <div className="flex  md:flex-row gap-10">
        <div className="mb-6">
          <p className=" font-normal">
            House No. <span className=" underline">{patient.houseNumber}</span>
          </p>
        </div>
        <div className="mb-6">
          <p className=" font-normal">
            Tel. <span className=" underline">{patient.phoneNumber}</span>
          </p>
        </div>
        
       
      </div>
      <div className="mb-6">
          <p className=" font-normal">
            Allergies <span className=" underline">{patient.allergies}</span>
          </p>
        </div>
        
      <div className="mb-6">
        <p className=" font-normal">Doctor Name:</p>
        <p>{prescription.doctorFullName}</p>
      </div>

      <div className="mb-6 mt-4">
        <p className=" font-normal">
          Pharmacy Name:{" "}
          <span className=" font-semibold">{prescription.pharmacyName}</span>
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">
          List of Medicines with Description
        </h3>
        <div className=" flex justify-between mx-2  ">
          <h2 className=" underline pb-3 text-left ">Medicine Name</h2>
          <h2 className=" underline pb-3 text-left  mr-56">
            Medicine Description
          </h2>
          <h2 className=" underline pb-3">Medicine Price</h2>
        </div>
        <div className=" flex flex-col gap-4">
          {medicines.map((medicine, index) => (
            <div key={index}>
              <div className=" flex  border-b-2  justify-between  mx-2">
                <p className="font-bold text-left  w-[200px]">
                  {medicine.name}
                </p>

                <div className="  mr-36 w-[500px]">
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
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 print:hidden rounded"
        >
          print{" "}
        </button>

        <button
          onClick={handlereject}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 print:hidden rounded"
        >
          back
        </button>
      </div>
    </div>
  );
}

export default PrescriptionDetail;
