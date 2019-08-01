import React, { useState, useEffect } from "react";
import firebase from "../fire";
import { Log } from "../types";
import { Link } from "react-router-dom";
import "../styles/Home.scss";
import LogElement from "./Log";

const Home = () => {
  const [logs, setLogs] = useState<Array<Log>>([]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser !== null) {
      firebase
        .database()
        .ref("users/" + currentUser.uid + "/logs")
        .on("value", snap => {
          let logs: Array<Log> = [];
          snap.forEach(data => {
            logs.push({ id: data.key, ...data.val() });
          });
          setLogs(logs);
        });
    }

    return 
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <main>
        {logs.map((log: Log) => (
          <LogElement key={log.id} log={log} />
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
