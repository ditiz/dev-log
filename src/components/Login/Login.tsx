import React, { useState } from "react";
import { auth } from "firebase";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
  };

  return (
    <article className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
