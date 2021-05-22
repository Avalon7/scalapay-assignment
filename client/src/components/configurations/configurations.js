import React, { Component } from 'react';
// import './configurations.css';

class configurations extends Component{
  constructor(){
    super();
    this.state = {
      configurations: []
    }
  }

  componentDidMount(){
    fetch('/configurations')
      .then(res => res.json())
      .then(res => this.setState({configurations: res.data}, () => 
        console.log(res.data)));
  }

  render() {
    return (
      <div>
        <h2>Configurations</h2>
          <p>{this.state.configurations.type}</p>
      </div>
    );
  };
}

export default configurations;
