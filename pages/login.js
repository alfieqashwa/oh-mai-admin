import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { LOGIN_MUTATION } from "graphql/login";
import { mutate, fetcherargs } from "../lib/useSWR";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState("");
  const router = useRouter();

  const { data, error } = useSWR(
    clicked
      ? [LOGIN_MUTATION, JSON.stringify({ email: email, password: password })]
      : null,
    fetcherargs
  );

  //console.log(data);

  async function loginMutation(email, password) {
    try {
      console.log("run");
      const a = await mutate(LOGIN_MUTATION, {
        email: "haskelchua@gmail.com",
        password: "1234",
      });
      console.log(document.cookie);
      router.push("/products");
    } catch (err) {
      console.log(err);
    }
  }

  function onLoginClicked() {
    // console.log(email);
    // console.log(password);
    //console.log("Login");
    //setClicked(true);
    loginMutation(email, password);
  }
  return (
    <div
      className="p-grid p-align-center p-justify-center"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="p-fluid" style={{ marginBottom: "10%" }}>
        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
        <Button label="Login" onClick={() => onLoginClicked()} />
      </div>
    </div>
  );
}
