import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onLoginClicked() {
    console.log(username);
    console.log(password);
    console.log("Login");
  }
  return (
    <div className="p-grid p-justify-between">
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            type="text"
            value={password}
            feedback={false}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button label="Login" onClick={onLoginClicked} />
      </div>
    </div>
  );
}
