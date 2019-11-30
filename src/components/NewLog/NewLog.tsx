import React, { useState, FormEvent } from "react";
import { database, auth } from "firebase";
import "./NewLog.scss";
import { withRouter } from "react-router-dom";
import Arrow from "../Icons/Arrow";

const NewLog = withRouter(({ history }) => {
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

    const currentUser = auth().currentUser;
    if (currentUser) {
      database()
        .ref("users/" + currentUser.uid + "/logs")
        .push(newLog);

      history.push("/");
    }
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="new-log">
      <header>
        <h1>New-Log</h1>
      </header>
      <section className="new-log_wrapper">
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
        <footer>
          <button onClick={goBack}>
            <Arrow />
          </button>
        </footer>
      </section>
    </div>
  );
});

export default NewLog;
