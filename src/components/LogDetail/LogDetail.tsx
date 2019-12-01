import React, { useEffect, useState } from "react";
import Arrow from "../Icons/Arrow";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { Log } from "../../types";
import loader from "../../img/loader.gif";
import "./LogDetail.scss";
import CodeTextArea from "../CodeTextArea/CodeTextArea";

interface ILogDetailProps {
  history: any;
  match: any;
}

const LogDetail = ({ history, match }: ILogDetailProps) => {
  const logId = match.params.id;
  const [ready, setReady] = useState(false);
  const [log, setLog] = useState<Log>();

  const [HTMLContent, setHTMLContent] = useState("");
  const [CSSContent, setCSSContent] = useState("");
  const [JSContent, setJSContent] = useState("");

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser !== null) {
      firebase
        .database()
        .ref(`users/${currentUser.uid}/logs/${logId}`)
        .once("value")
        .then(snapshot => {
          const data = snapshot.val();

          setLog({ id: snapshot.key, ...data });

          setHTMLContent(data.html);
          setCSSContent(data.css);
          setJSContent(data.js);

          setReady(true);
        });
    }
  }, [logId]);

  if (ready && log) {
    return (
      <div className="log-detail">
        <header>
          <h1>Dev-Log</h1>
        </header>
        <main>
          <CodeLink log={log} setLog={setLog} />
          <div>
            <CodeTextArea
              value={HTMLContent}
              setValue={setHTMLContent}
              language="html"
            />
            <CodeTextArea
              value={CSSContent}
              setValue={setCSSContent}
              language="css"
            />
            <CodeTextArea
              value={JSContent}
              setValue={setJSContent}
              language="js"
            />
          </div>
        </main>
        <footer>
          <button onClick={goBack}>
            <Arrow />
          </button>
        </footer>
      </div>
    );
  } else {
    return (
      <div className="loader">
        <img src={loader} alt="loader" />
      </div>
    );
  }
};

const CodeLink = ({ log, setLog }: any) => {
  const [editable, setEditable] = useState(false);

  return (
    <div className="code-link">
      <span>Link</span>
      {editable ? (
        <div>
          <input
            type="text"
            value={log.link}
            onChange={e => setLog({ ...log, link: e.target.value })}
          />
          <button onClick={() => setEditable(!editable)}>Save</button>
        </div>
      ) : (
        <div>
          <a href={log.link}>{log.link}</a>
          <button onClick={() => setEditable(!editable)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default LogDetail;
