import React, { useState, useEffect } from "react";
import firebase from "../fire";
import { Log } from "../types";
import { Link } from "react-router-dom";

const Home = () => {
  const [logs, setLogs] = useState<Array<Log>>([]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser !== null) {
      let logs = firebase
        .database()
        .ref("users/" + currentUser.uid)
        .once("value")
        .then(snap => {
          setLogs(snap.val().logs);
        });
    }
  }, []);

  const addLog = () => {};

  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <main>
        {logs.map((log: Log) => (
          <article className="log" key={log.id}>
            <h2>{log.name}</h2>
            <div>{log.content}</div>
          </article>
        ))}
      </main>
      <footer>
        <Link to="/newLog" className="add-log">
            New Log
        </Link>
        <button className="sign-out" onClick={signOut}>
          SignOut
        </button>
      </footer>
    </>
  );
};

export default Home;
