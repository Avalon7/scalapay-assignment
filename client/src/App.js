import React, { Component } from 'react';
import Configurations from './components/configurations/configurations'
import Orders from './components/orders/orders'

// import logo from './logo.svg';
import './App.css';

class App extends Component{

  render() {
    return (
      <div className="App">
        <header>
          <h1>Scalapay taken home assignment</h1>
        </header>
        <Configurations />
        <Orders />
      </div>
    );
  };
}

export default App;
