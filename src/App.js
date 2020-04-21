import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './CommonComponents/Header/Header';

import Home from './Pages/Home';
import PCA from './Pages/PCA';
import ProcessFile from './Pages/ProcessFile';
import LinearRegression from './Pages/LinearRegression';
import LogisticRegression from './Pages/LogisticRegression';
import NeuralNetworks from './Pages/NeuralNetworks';
import DecisionTrees from './Pages/DecisionTrees';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header/>
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path='/pca' exact component={ PCA } />
            <Route path='/process_file' exact component={ ProcessFile } />
            <Route path='/linear_regression' exact component={ LinearRegression } />
            <Route path='/logistic_regression' exact component={ LogisticRegression } />
            <Route path='/neural_networks' exact component={ NeuralNetworks } />
            <Route path='/decision_tree' exact component={ DecisionTrees } />
          </Switch>
      </div>
    </Router>
    
  );
}

export default App;
