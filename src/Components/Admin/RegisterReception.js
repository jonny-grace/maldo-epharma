"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const RegisterReception = () => {
  const router = useRouter();
  const [receptions, setReceptions] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",

    username: "",
    age: "",
    gender: "male",
  });


  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceptions((prevreceptions) => ({
      ...prevreceptions,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(receptions);
    if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/register/reception/`,
        receptions,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        alert("reception registered successfully");
        router.push("/admin");
        // Handle the response data here
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          // Check if the error is due to duplicate username or email
          if (status === 400) {
            if (data.message === "Username is already taken") {
              // Display an alert for duplicate username
              alert("Username is already taken");
            } else if (data.message === "Email is already taken") {
              // Display an alert for duplicate email
              alert("Email is already taken");
            }
          } else {
            // Display a generic error message for other errors
            alert("An error occurred during registration");
          }
        } else {
          // Display a generic error message for network or other errors
          alert("An error occurred during registration");
        }
      });
    }
    // Perform further actions with the receptions' data
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-7xl bg-white">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-5">
          Reception Registration Form
        </h2>
        <form
          className="flex flex-col  w-full max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="  gap-10">
            <div className="mb-5">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                required
                type="text"
                name="firstname"
                id="firstname"
                value={receptions.firstname}
                onChange={handleInputChange}
                className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                required
                type="text"
                name="lastname"
                id="lastname"
                value={receptions.lastname}
                onChange={handleInputChange}
                className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="  gap-10">
            <div className="mb-5">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                required
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={receptions.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex  gap-10">
            <div className="mb-5">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={receptions.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md 
                shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <input
                required
                type="number"
                name="age"
                id="age"
                value={receptions.age}
                onChange={handleInputChange}
                className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                value={receptions.email}
                onChange={handleInputChange}
                className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="  gap-10">
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  UserName
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  value={receptions.username}
                  onChange={handleInputChange}
                  className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create reception
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default RegisterReception;
