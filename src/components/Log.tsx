import React from "react";
import { Log } from "../types";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

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
      <h2>{log.name}</h2>
      <div className="log_date">{log.date}</div>
      <div className="log_content">{log.content}</div>
    </article>
  );
};

export default LogElement;
