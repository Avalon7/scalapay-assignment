import React, { Component } from 'react';

class configurations extends Component{
  constructor(){
    super();
    this.state = {
      configurations: {},
      minimumAmount: {},
      maximumAmount: {}, 
    }
  }

  componentDidMount(){
    fetch('/configurations')
      .then(res => res.json())
      .then(res => this.setState({configurations: res.data, minimumAmount: res.data.minimumAmount, maximumAmount: res.data.maximumAmount}, () => 
        console.log(res.data)));
  }

  render() {
    const {type, description, minimumAmount, maximumAmount, numberOfPayments} = this.state.configurations;
    return (
      <div>
        <h2>Display Configurations:</h2>
          <p>Payment type: {this.state.configurations.type}</p>
          <p>Payment description: {this.state.configurations.description}</p>
          <p>Minimum payment: {this.state.minimumAmount.amount} {this.state.minimumAmount.currency}</p>
          <p>Maximum payment: {this.state.maximumAmount.amount} {this.state.minimumAmount.currency}</p>
          <p>Number of payment: {this.state.configurations.numberOfPayments}</p>
      </div>
    );
  };
}

export default configurations;
