import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
export const Navbar = () => {
  return (
    <div className="nav">
      <div className="navName">Navbar</div>
      <Link style={{ textDecoration: "none" ,color:"teal" }} to={"/"}>
        Task Manager📑
      </Link>
      <Link to={"/signin"} style={{ textDecoration: "none" ,color:"teal" }} >Signin 📍</Link>
      <Link to={"/signup"} style={{ textDecoration: "none" ,color:"teal" }} >Signup 📜</Link>
    </div>
  );
};
