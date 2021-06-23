import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { LOGIN_MUTATION } from "graphql/login";
import useSWR from "swr";
import { useRouter } from "next/router";
import useUser from "lib/useUser";
import Cookies from "js-cookie";
import PuffLoader from "react-spinners/PuffLoader";
import { getClient } from "lib/graphqlclient";

export default function Login() {
  //useUser({ redirectTo: "/", redirectIfFound: true });
  const [wrongField, setWrongField] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const client = getClient()

  async function loginMutation(email, password) {
    try {
      console.log("run");
      const a = await client.request(LOGIN_MUTATION, {
        email: email,
        password: password,
      });

      console.log(a);
      Cookies.set("token", a.login.token);
      setHeader(Cookies.get("token"));

      router.push("/");

      console.log("pushed");
    } catch (err) {
      console.log(err.response?.errors[0].message);
      if (
        err.response?.errors[0].message ==
        "Failed to serialize user into session"
      ) {
        setWrongField(true);
      }
    }
  }

  function onLoginClicked() {
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
              setWrongField(false);
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
              setWrongField(false);
            }}
          />
        </div>
        <Button label="Login" onClick={() => onLoginClicked()} />

        {wrongField && <p className="p-invalid">Wrong email/password.</p>}
      </div>
    </div>
  );
}
