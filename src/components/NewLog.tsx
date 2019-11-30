import React, { useState, FormEvent } from "react";
import { database, auth } from "firebase";
import "../styles/NewLog.scss";
import { withRouter } from "react-router-dom";

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

const Arrow = () => (
  <svg viewBox="0 0 512 512" width="20" height="20" style={{ fill: "#FFF" }}>
    <path
      d="M464.344,207.418l0.768,0.168H135.888l103.496-103.724c5.068-5.064,7.848-11.924,7.848-19.124
			c0-7.2-2.78-14.012-7.848-19.088L223.28,49.538c-5.064-5.064-11.812-7.864-19.008-7.864c-7.2,0-13.952,2.78-19.016,7.844
			L7.844,226.914C2.76,231.998-0.02,238.77,0,245.974c-0.02,7.244,2.76,14.02,7.844,19.096l177.412,177.412
			c5.064,5.06,11.812,7.844,19.016,7.844c7.196,0,13.944-2.788,19.008-7.844l16.104-16.112c5.068-5.056,7.848-11.808,7.848-19.008
			c0-7.196-2.78-13.592-7.848-18.652L134.72,284.406h329.992c14.828,0,27.288-12.78,27.288-27.6v-22.788
			C492,219.198,479.172,207.418,464.344,207.418z"
    />{" "}
  </svg>
);

export default NewLog;
