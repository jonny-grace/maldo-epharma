import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/statistics`);
        const data = response.data;
        console.log(data);
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-wrap">
      {dashboardData && (
        <>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-bold text-gray-800">Total Patients</div>
                <div className="bg-gray-200 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 9a6 6 0 00-6-6m6 6a6 6 0 000-12v12z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">{dashboardData.patients}</div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-bold text-gray-800">Total Doctors</div>
                <div className="bg-gray-200 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">{dashboardData.doctors}</div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-bold text-gray-800">Total Pharmacies</div>
                <div className="bg-gray-200 rounded-full p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-14 0V4a7 7 0 017 7v0a7 7 0 017 0v7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">{dashboardData.pharmacies}</div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-bold text-gray-800">Active Pharmacies</div>
                <div className="bg-gray-200 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">{dashboardData.activePharma}</div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-bold text-gray-800">Inactive Pharmacies</div>
                <div className="bg-gray-200 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-14 0V4a7 7 0 017 7v0a7 7 0 017 0v7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-700">{dashboardData.inactivePharma}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;