import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Switch from 'react-switch';
import { toast } from 'react-hot-toast';

const ManagePharmacies = () => {
  const router = useRouter();
  const [pharmacies, setPharmacies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  
  function showNotification(message, type) {
    toast[type](message, {
      duration: 5000, // 5 seconds
    });
  }

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pharmacies`);
        const data = await response.json();
       
        setPharmacies(data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchPharmacies();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggle = async (pharmacyId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/pharmacy/status/${pharmacyId}`, {
        pharmacyId,
        status: newStatus
      });
      const updatedPharmacy = response.data;
      const updatedPharmacies = pharmacies.map((pharmacy) =>
        pharmacy.userId === updatedPharmacy.userId ? updatedPharmacy : pharmacy
      );
      setPharmacies(updatedPharmacies);
      showNotification(`pharmacy status updated`, 'success');
     window.location.reload();
    //   toast.success(`Pharmacy ${updatedPharmacy.pharmacyName} ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error updating pharmacy status:', error);
      showNotification('Failed to update pharmacy status', 'error');
      toast.error('Failed to update pharmacy status');
    }
  };

  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    `${pharmacy.firstname} ${pharmacy.pharmacyName} ${pharmacy.phoneNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <input
            type="text"
            className="w-72 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search pharmacies..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Pharmacy Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Activate/Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {filteredPharmacies.map((pharmacy, index) => (
            <tr key={pharmacy.userId}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{pharmacy.pharmacyName}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <Switch
                  onChange={() => handleToggle(pharmacy.userId, pharmacy.status)}
                  checked={pharmacy.status === 'active'}
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

export default ManagePharmacies;