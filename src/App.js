import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AboutView from './view/About';
import HomeView from './view/HomeView';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/about">
            <AboutView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
