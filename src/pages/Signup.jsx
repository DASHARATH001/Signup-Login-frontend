import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "./Tostifiy";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  console.log("SignupInfo ->", signupInfo);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !password || !email) {
      return toastError("Name , Email & Password is required");
    }
    try {
      const url = "https://signup-login-backend-beta.vercel.app";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await res.json();
      const { success, message, error } = result;
      if (success) {
        toastSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        toastError(details);
      } else if (!success) {
        toastError(message);
      }
      console.log(result);
    } catch (error) {
      toastError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form action="" onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            autoFocus
            onChange={handleChange}
            placeholder="Enter Your Name"
            name="name"
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleChange}
            placeholder="Enter Your Email"
            name="email"
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handleChange}
            placeholder="Enter Your Password"
            name="password"
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>{" "}
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
