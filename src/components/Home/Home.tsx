import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { Log } from "../../types";
import { Link } from "react-router-dom";
import "./Home.scss";
import LogElement from "../Log";
import Search from "../Search";
import loader from "../../img/loader.gif";

const Home = () => {
  const [logs, setLogs] = useState<Array<Log>>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser !== null) {
      firebase
        .database()
        .ref("users/" + currentUser.uid + "/logs")
        .orderByChild("name")
        .startAt("I just finish to make this app functional")
        .on("value", snap => {
          let logs: Array<Log> = [];
          snap.forEach(data => {
            logs.push({ id: data.key, ...data.val() });
          });
          setLogs(logs.reverse());
          setReady(true);
        });
    }
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <section className="search">
        <Search search={search} setSearch={setSearch} />
      </section>
      {ready ? (
        <main>
          {logs.map((log: Log) => (
            <LogElement key={log.id} log={log} />
          ))}
        </main>
      ) : (
        <div className="loader">
          <img src={loader} alt="loader" />
        </div>
      )}
      <footer>
        <Link to="/newLog" className="add-log">
          New Log
        </Link>
        <button className="sign-out" onClick={signOut}>
          Signout
        </button>
      </footer>
    </>
  );
};

export default Home;
