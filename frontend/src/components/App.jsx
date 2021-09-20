/* eslint-disable */
import React, {useRef} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from './Register';
import Homepage from "./Homepage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/homepage" component={Homepage} />
        <Route exact path="/">
          <Redirect to="/register" />
        </Route>
      </Switch>
    </Router>
  );
} 

export default App;
