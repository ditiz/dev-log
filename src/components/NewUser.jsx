import React, { useState } from "react";
import { auth } from "firebase";

const NewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
  };

  return (
    <article className="log newUser">
      <h2>Inscription</h2>
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

export default NewUser;
