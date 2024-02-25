import React, { useEffect, useState } from "react";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Switch from "react-switch";
import { toast } from "react-hot-toast";
import Link from "next/link";

const ManageDoctors = () => {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState(false);
  function showNotification(message, type) {
    toast[type](message, {
      duration: 8000, // 5 seconds
    });
  }

  useEffect(() => {
    const fetchdoctors = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/doctors`
        );
        const data = await response.json();
        //  console.log(data);
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchdoctors();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggle = async (doctorId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/doctor/status/${doctorId}`,
        {
          doctorId,
          status: newStatus,
        }
      );
      const updateddoctor = response.data;
      const updateddoctors = doctors.map((doctor) =>
        doctor.userId === updateddoctor.userId ? updateddoctor : doctor
      );
      setDoctors(updateddoctors);
      
      setTimeout(() => {
        showNotification(`Doctor status updated`, "success");
        router.replace(router.route)// Reset toggle switch state after showing notification
      }, 800);

      
      
    } catch (error) {
      console.error("Error updating doctor status:", error);
      showNotification("Failed to update doctor status", "error");
      toast.error("Failed to update doctor status");
    }
  };

  const filtereddoctors = doctors.filter((doctor) =>
    `${doctor.firstname} ${doctor.lastname} ${doctor.phoneNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Link href="/admin/register-doctor" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
           Register doctor
        </Link>
        <div>
          <input
            type="text"
            className="w-72 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              doctor Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300">
              Activate/Deactivate
            </th>
          </tr>
        </thead>
        <tbody>
          {filtereddoctors.map((doctor, index) => (
            <tr key={doctor.userId}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {doctor.firstname} {doctor.lastname}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <Switch
                  onChange={() => handleToggle(doctor.userId, doctor.status)}
                  checked={doctor.status === "active"}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDoctors;
