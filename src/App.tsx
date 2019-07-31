import React, { useState, useEffect } from "react";
import "./App.scss";
import firebase from "./fire";
import Home from "./components/Home";
import Auth from "./components/Auth";
import loader from "./img/loader.gif";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setReady(true);
    });
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Dev-Log</h1>
      </header>
      {ready ? (
        <>{user ? <Home /> : <Auth />}</>
      ) : (
        <div className="loader">
          <img src={loader} alt="loader" />
        </div>
      )}
    </div>
  );
};

export default App;
