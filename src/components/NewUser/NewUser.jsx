import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "./NewUser.scss";

const NewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
  };

  return (
    <article className="newUser-form">
      <h2>Inscription</h2>
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

export default NewUser;
