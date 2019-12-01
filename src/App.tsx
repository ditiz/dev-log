import React, { useState, useEffect } from "react";
import "./fire";
import "./App.scss";
import Home from "./components/Home/Home";
import Auth from "./components/Auth";
import loader from "./img/loader.gif";
import * as firebase from "firebase/app";
import "firebase/auth";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState<boolean>(false);

  //To avoid chrome warning
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
