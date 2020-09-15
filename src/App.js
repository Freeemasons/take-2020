import React from 'react';
import './App.css';
import Form from "./Components/Form";
import Contacts from "./Components/Contacts";
import {Row, Grid, Col} from "react-flexbox-grid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  browserHistory
} from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


function App() {
  return (
    <Router history={history}>


      <Switch>
        <Route exact path="/" component={Form} />

        <Route  path="/contacts" component={Contacts} />
      </Switch>
    </Router>
  );
}

export default App;
