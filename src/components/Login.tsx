import React, { useState } from "react";
import firebase from "../fire";

const Login = () => {
  const [email, setEmail] = useState("pouet@pouet.com");
  const [password, setPassword] = useState("pouet3838@");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
  };

  return (
    <article className="log login">
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-between",
          height: "10rem"
        }}
      >
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </article>
  );
};

export default Login;
