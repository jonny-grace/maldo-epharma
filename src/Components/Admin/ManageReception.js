import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Switch from 'react-switch';
import { toast } from 'react-hot-toast';

const Managereceptions = () => {
  const router = useRouter();
  const [receptions, setreceptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  
  function showNotification(message, type) {
    toast[type](message, {
      duration: 5000, // 5 seconds
    });
  }

  useEffect(() => {
    const fetchreceptions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/receptions`);
        const data = await response.json();
      //  console.log(data);
        setreceptions(data);
      } catch (error) {
        console.error('Error fetching receptions:', error);
      }
    };

    fetchreceptions();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleToggle = async (receptionId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/reception/status/${receptionId}`, {
        receptionId,
        status: newStatus
      });
      const updatedreception = response.data;
      const updatedreceptions = receptions.map((reception) =>
        reception.userId === updatedreception.userId ? updatedreception : reception
      );
      setreceptions(updatedreceptions);
      showNotification(`reception status updated`, 'success');
     window.location.reload();
    //   toast.success(`reception ${updatedreception.receptionName} ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Error updating reception status:', error);
      showNotification('Failed to update reception status', 'error');
      toast.error('Failed to update reception status');
    }
  };

  const filteredreceptions = receptions.filter((reception) =>
    `${reception.firstname} ${reception.lastname} ${reception.phoneNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const handleRegisterPatient = () => {
    router.push('/admin/register-reception');
  };
  return (
    <div>
      <div className="flex justify-between mb-4">
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={handleRegisterPatient}
        >
          Register Reception
        </button>
        <div>

          <input
            type="text"
            className="w-72 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search receptions..."
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
              Reception Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Activate/Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {filteredreceptions.map((reception, index) => (
            <tr key={reception.userId}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{reception.firstname} {reception.lastname}</td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <Switch
                  onChange={() => handleToggle(reception.userId, reception.status)}
                  checked={reception.status === 'active'}
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

export default Managereceptions;