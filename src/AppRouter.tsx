import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import NewLog from "./components/NewLog/NewLog";
import LogDetail from "./components/LogDetail/LogDetail";

const AppRouter = () => {
  return (
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/NewLog" component={NewLog} />
      <Route path="/Log/:id" component={LogDetail} />
    </Router>
  );
};

export default AppRouter;
