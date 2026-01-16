import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "./Tostifiy";


const Login = () => {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  console.log("LoginInfo ->", LoginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (!password || !email) {
      return toastError(" Email & Password is required");
    }
    try {
      const url = "https://signup-login-backend-beta.vercel.app";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
      });
      const result = await res.json();
      const { success, message, error, jwtToken, name } = result;
      if (success) {
        toastSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name)
        setTimeout(() => {
          navigate("/Home");
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
      <h1>Login</h1>
      <form action="" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleChange}
            placeholder="Enter Your Email"
            name="email"
            value={LoginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={handleChange}
            placeholder="Enter Your Password"
            name="password"
            value={LoginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account ? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
