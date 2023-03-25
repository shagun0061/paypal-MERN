import React, { useState } from "react";
import axios from "axios";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handelSubmit(event) {
    event.preventDefault();
    if (email && password) {
      let payload = { email: email, password: password };

      axios
        .post("https://katydid-top-hat.cyclic.app/signin", payload)
        .then((res) => {
          localStorage.setItem("Token", res.data.token);
          if (res.data == "Register first") {
            alert(res.data);
          } else {
            alert(res.data.msg);
          }
        });
      setEmail("");
      setPassword("");
    }
  }
  return (
    <div>
      <div>
        <h2>Signin📍</h2>
        <div className="signin-main">
          <img
            src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png"
            width={"100px"}
          />
          <form onSubmit={(event) => handelSubmit(event)}>
            <label>
              User Email
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
              User Password
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
    </div>
  );
};
