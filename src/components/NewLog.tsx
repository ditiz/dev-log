import React, { useState, FormEvent } from "react";
import firebase from "../fire";
import "../styles/NewLog.scss";
import { withRouter } from "react-router-dom";

const NewLog = withRouter(({history}) => {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newLog = {
      name: name,
      content: content,
      date: date
    };

    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase
        .database()
        .ref("users/" + currentUser.uid + "/logs")
				.push(newLog);
				
			history.push('/');
    }
  };

  return (
    <div className="new-log">
      <header>
        <h1>New Log</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label>
            Content:
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </label>

          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>

          <input type="submit" value="Create a new log" />
        </form>
      </main>
    </div>
  );
});

export default NewLog;
