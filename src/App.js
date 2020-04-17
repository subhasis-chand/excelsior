import React from 'react';
import Home from './Pages/Home';
import ProcessFile from './Pages/ProcessFile';
import LinearRegression from './Pages/LinearRegression';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './CommonComponents/Header/Header'
import LeftSideBar from './CommonComponents/LeftSideBar/LeftSideBar'
import './App.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header/>
        <div className='app-body'>
          <LeftSideBar/>
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path='/process_file' exact component={ ProcessFile } />
            <Route path='/linear_regression' exact component={ LinearRegression } />
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
