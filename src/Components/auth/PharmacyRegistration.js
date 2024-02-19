"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
function PharmacyRegistration() {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [],
  });
  
  const router = useRouter();
  function showNotification(message, type) {
    toast[type](message, {
      duration: 3000, // 5 seconds
    });
  }
  

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    pharmacyName: "",
    username: "",
    city: "",
    licence_no: "",
    phoneNumber: "",
    email: "",
    password: "",
    location: {
      type: "Point",
      coordinates: [location.coordinates[0], location.coordinates[1]],
    },
  });


  useEffect(() => {

    const showPosition = (position) => {
      const { latitude, longitude } = position.coords;
      const updatedLocation = {
        ...location,
        coordinates: [latitude, longitude],
      };
      setLocation(updatedLocation);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  

  console.log(location.coordinates[0],location.coordinates[1]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
// Update formData.location with coordinates from location state
const updatedFormData = {
  ...formData,
  location: {
    ...formData.location,
    coordinates: location.coordinates,
  },
};
    // console.log(updatedFormData)
    try {
      // const token = localStorage.getItem('token');

      const response = await fetch(`${api_url}/admin/register/pharma`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      // console.log(data)
      if (response.ok) {
        showNotification(
          `registered wait for the admin to activate your account`,
          "success"
        );
        router.push("/");
        console.log("Registered! Please wait for approval.", data);
      } else {
        if (data.message === "Username already taken") {
          showNotification("Username already taken", "error");
        } else if (data.message === "Email already registered") {
          showNotification("Email already registered", "error");
        } else {
          showNotification(data.message, "error");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto max-w-xl  p-8 bg-white rounded-lg shadow-md my-10">
      <h1 className="text-2xl font-bold mb-4">Register Pharmacy</h1>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="mb-5">
          <label
            htmlFor="firstname"
            className="block font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            required
            type="text"
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="lastname" className="block font-medium text-gray-700">
            Last Name
          </label>
          <input
            required
            type="text"
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
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
            value={formData.username}
            onChange={handleChange}
            className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            password
          </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="pharmacyName"
            className="block font-medium text-gray-700"
          >
            Pharmacy Name
          </label>
          <input
            required
            type="text"
            name="pharmacyName"
            id="pharmacyName"
            value={formData.pharmacyName}
            onChange={handleChange}
            className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block font-medium text-gray-700">
            City
          </label>
          <input
            required
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="licence_no"
            className="block font-medium text-gray-700"
          >
            License Number
          </label>
          <input
            required
            type="text"
            name="licence_no"
            id="licence_no"
            value={formData.licence_no}
            onChange={handleChange}
            className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="phoneNumber"
            className="block font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            required
            type="phone"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default PharmacyRegistration;
