import React, { useState, FormEvent } from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { withRouter } from "react-router-dom";
import dayjs from "dayjs";
import "./NewLog.scss";
import CodeTextArea from "../CodeTextArea/CodeTextArea";
import Arrow from "../Icons/Arrow";

const NewLog = withRouter(({ history }) => {
  const [name, setName] = useState<string>("");
  const HTMLContent = useState<string>("");
  const CSSContent = useState<string>("");
  const JSContent = useState<string>("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));

  const codeTextAreas = [
    { name: "html", state: HTMLContent },
    { name: "css", state: CSSContent },
    { name: "js", state: JSContent }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newLog = {
      name,
      html: HTMLContent[0],
      css: CSSContent[0],
      js: JSContent[0],
      link,
      date
    };

    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase
        .database()
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

            {codeTextAreas.map(language => (
              <CodeTextArea
                language={language.name}
                value={language.state[0]}
                setValue={language.state[1]}
                key={language.name}
              />
            ))}

            <label>
              Link:
              <input
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
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
