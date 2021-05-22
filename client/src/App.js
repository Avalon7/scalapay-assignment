import React, { Component } from 'react';
import Configurations from './components/configurations/configurations'

import logo from './logo.svg';
import './App.css';

class App extends Component{

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" className="App-logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Configurations />
      </div>
    );
  };
}

export default App;
