"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "./withAuth";
import { getConfig } from "next/config";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

function Login() {

  
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  function showNotification(message, type) {
    toast[type](message, {
      duration: 5000, // 5 seconds
    });
  }

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
    // Make API call to login endpoint with username and password
    fetch(`${api_url}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          // notify('Invalid credentials',"error");
          showNotification(`Invalid username or password `, "error");

          // throw new Error('Invalid credentials');
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.aaaaaaaa");
        }
      })
      .then((data) => {
        // Handle successful login response

        // Store the token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.userData)); // Store userData in localStorage

        // Assign the role value to the 'role' variable
        const role = data.userData.role;
        localStorage.setItem("role", role);
        console.log("Role:", role);

        // Navigate based on the role
        // Check if the user's role is 'pharmacy' and the status is 'active'
        if (role === "pharmacy" && data.userData.status === "active") {
          router.push("/pharmacy");
        } else if (role === "admin") {
          router.push("/admin");
        } else if (role === "reception" && data.userData.status === "active") {
          router.push("/reception");
        } else if (role === "doctor" && data.userData.status === "active") {
          router.push("/doctor");
        } else {
          showNotification(`Your account is not activated yet`, "error");
          // i want to remove the localstorage token and userdata
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        if (error.message === "Invalid username or password") {
          showNotification(`Invalid username or password`, "error");
        }
      });
 
   }   };
  return (
    <>
      <div className="py-8 w-full bg-blue-50 h-full">
        <div className="flex border  border-spacing-1 px-4 py-32 rounded-lg shadow-lg overflow-hidden mx-auto  max-w-sm lg:max-w-7xl">
          <div
            className="hidden lg:flex justify-center lg:w-1/2   bg-blue-400"
            // style={{ backgroundImage: "url(../assets/maldo_login.png)" }}
          >
            <Image src={'/assets/maldo_login.PNG'} width={1000} height={1000} alt="maldo" 
            className=" bg-cover object-cover" />
          </div>
          <div className="w-full p-8 lg:w-1/2">
            {/* <h2 className="text-2xl font-semibold text-gray-700 text-center">Doctor</h2> */}
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase"
              >
                login Here
              </a>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  {/* <a href="#" className="text-xs text-gray-500">Forget Password?</a> */}
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-gray-700  text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                >
                  Login
                </button>
              </div>
            </form>
            <h2 className=" w-full mx-auto italic text-gray-800 my-7">
              {" "}
              you are a new pharmacy register here{" "}
              <Link
                className=" text-blue-200 hover:text-blue-500 hover:underline font-bold"
                href={"/register-new-pharmacy"}
              >
                Register
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Login);
