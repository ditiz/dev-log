import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import NewLog from "./components/NewLog/NewLog";

const AppRouter = () => {
  return (
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/NewLog" component={NewLog} />
    </Router>
  );
};

export default AppRouter;
