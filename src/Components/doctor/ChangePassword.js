import axios from "axios";
import React, { useState } from "react";

// ChangePasswordModal component
const ChangePasswordModal = ({ doctorName, onClose,doctorId }) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    const data = {
        doctorId: doctorId,
        oldPassword: oldPassword,
        newPassword: newPassword
      };
    
      axios.post(`${api_url}/doctor/changepassword`, data)
        .then(response => {
          alert("Password updated successfully"); // Assuming the API returns a message key in the response
          console.log("Password updated succesfully");
          onClose(); // Close the modal
        })
        .catch(error => {
          console.error('Error updating password: ', error);
          alert('Failed to update password');
        });
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto ">
      <div className="flex items-end justify-center min-h-screen  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-blue-50 min-w-6xl px-12 py-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={onClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Update Password
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {doctorName}
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <label
                      htmlFor="oldPassword"
                      className="block font-medium text-gray-700"
                    >
                      Old Password
                    </label>
                    <input
                      required
                      type="password"
                      name="oldPassword"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                 
                  <div className="mb-5">
                    <label
                      htmlFor="newPassword"
                      className="block font-medium text-gray-700"
                    >
                     New Password
                    </label>
                    <input
                      required
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// DoctorsPage component
const DoctorsPage = ({doctor}) => {
   
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorName, setDoctorName] = useState("Doctor Name");

  const handleUpdateProfile = () => {
    // Assume you have a function to get the logged-in doctor's name
    const loggedInDoctorName = doctor.firstname + " " + doctor.lastname;
    setDoctorName(loggedInDoctorName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
        
      <div className="flex flex-col items-start justify-end p-4 ">
      {doctor && <div className=" font-bold italic text-xl underline"><h2>{doctor.firstname} {doctor.lastname} </h2></div>}
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </div>
      {isModalOpen && (
        <ChangePasswordModal
        doctorId={doctor.userId}
          doctorName={doctorName}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DoctorsPage;
