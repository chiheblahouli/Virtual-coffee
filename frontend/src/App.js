import React, { useEffect, Fragment } from "react";
import Landing from "./components/Landing";
import dashboard from "./components/dashboard";
import Login from "./components/login";
import Chat1 from "./components/chat1";
import Coffee from "./components/theGate";
import Coffee1 from "./components/theFirst";
import Coffee2 from "./components/Lafontaine";
import Coffee3 from "./components/bigDip";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
const queryCache = new QueryCache();
const App = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      {" "}
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:coffeename/:tablename" component={Chat1} />
          <Route exact path="/the gate/" component={Coffee} />
          <Route exact path="/the first/" component={Coffee1} />
          <Route exact path="/la fontaine/" component={Coffee2} />
          <Route exact path="/big dip/" component={Coffee3} />
        </Switch>
      </Router>
      <ReactQueryDevtools />{" "}
    </ReactQueryCacheProvider>
  );
};
export default App;
