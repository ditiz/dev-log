import React from "react";
import { Log } from "../../types";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "./Log.scss";
import { Link } from "react-router-dom";

interface LogProps {
  log: Log;
}

const LogElement = ({ log }: LogProps) => {
  const removeLog = () => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      const currentUser = firebase.auth().currentUser;
      if (currentUser && log.id) {
        firebase
          .database()
          .ref("users/" + currentUser.uid + "/logs")
          .child(log.id)
          .remove();
      }
    }
  };

  return (
    <article className="log">
      <button className="log_remove" onClick={removeLog}>
        X
      </button>
      <Link to={`/log/${log.id}`}>
        <h2>{log.name}</h2>
      </Link>
      <div className="log_date">{log.date}</div>
      <div className="log_content">
        <a href={log.link}>{log.link}</a>
      </div>
    </article>
  );
};

export default LogElement;
