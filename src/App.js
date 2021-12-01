import React from 'react';
import './style/App.css';
import WebcamCapture from './WebcamCapture';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Preview from './Preview';



function App() {
  return (
    <div className="app">
      <Router>
        <div className = "app__body">
          <Switch>
            <Route path="/Preview" >
              <Preview />
            </Route>
            <Route exact path="/">
              <WebcamCapture  />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
