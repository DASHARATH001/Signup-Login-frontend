import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "./Tostifiy";

const Home = () => {
  const [loggedInUser, setloggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setloggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    toastSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/Login");
    }, 1000);
  };

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button type="button" onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
