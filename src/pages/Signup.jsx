import axios from "axios";
import React, { useState } from "react";
import "./Signup.css";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handelsignup(event) {
    event.preventDefault();
    if (email && password && name) {
      let payload = { email: email, password: password, username: name };

      axios
        .post("https://katydid-top-hat.cyclic.app/signup", payload)
        .then((res) => {
          console.log("res", res);
          alert(res.data);
        });
      setEmail("");
      setPassword("");
      setName("");
    } else {
      alert("fill all data");
    }
  }
  return (
    <div>
      <h2>Signup📜</h2>
      <div className="signin-main">
        <div style={{}}><img
          src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png"
          width={"100px"}
        /></div>
        <form
          onSubmit={(event) => {
            handelsignup(event);
          }}
        >
          <label>
            User Name{" "}
            <span>
              <sup style={{ color: "red" }}>*</sup>
            </span>
          </label>
          <br></br>
          <input
            value={name}
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br></br>
          <label>
            User Email{" "}
            <span>
              <sup style={{ color: "red" }}>*</sup>
            </span>
          </label>
          <br></br>
          <input
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br></br>
          <label>
            User Password{" "}
            <span>
              <sup style={{ color: "red" }}>*</sup>
            </span>
          </label>
          <br></br>
          <input
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br></br>
          <input className="btn" type="submit" />
          
        </form>
      </div>
    </div>
  );
};
