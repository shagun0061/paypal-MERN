import { Route, Routes } from "react-router-dom";
import React from 'react'
import { Home } from "./Home";
import { Signin } from "./Signin";
import { Signup } from "./Signup";

export const Allroutes = () => {
  return (
    <Routes>
     <Route path="/" element={<Home/>}></Route>
     <Route path="/signin" element={<Signin/>}></Route>
     <Route path="/signup" element={<Signup/>}></Route>
      

    </Routes>
  )
}
