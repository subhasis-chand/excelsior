import React from 'react';
import Home from './Pages/Home';
import ProcessFile from './Pages/ProcessFile';
import LinearRegression from './Pages/LinearRegression';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        {/* <Header/> */}
        <Switch>
          <Route path='/' exact component={ Home } />
          <Route path='/process_file' exact component={ ProcessFile } />
          <Route path='/linear_regression' exact component={ LinearRegression } />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
