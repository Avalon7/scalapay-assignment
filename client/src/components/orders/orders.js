import React, { Component } from 'react';
import axios from 'axios';

class orders extends Component{

  constructor(){
    super();

    this.state = {
      totalAmount: '20',
      givenName: 'test',
      surName: 'test',
      //dummy data for itemLists      
      items: [
        {
          "name": "T-Shirt",
          "category": "clothes",
          "subcategory": [
            "shirt",
            "long-sleeve"
          ],
          "brand": "TopChoice",
          "gtin": "123458791330",
          "sku": "12341234",
          "quantity": 1,
          "price": {
            "amount": "10.00",
            "currency": "EUR"
          }
        },
        {
          "name": "Jeans",
          "category": "clothes",
          "subcategory": [
            "pants",
            "jeans"
          ],
          "brand": "TopChoice",
          "gtin": "123458722222",
          "sku": "12341235",
          "quantity": 1,
          "price": {
            "amount": "20.00",
            "currency": "EUR"
          }
        }
     ]
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    axios
      .post('/orders', this.state)
      .then(res => {
        console.log(res.data)
        console.log(res.status)
        if(res.status === 200){
          console.log('status ok')
          // window.location.href = res.data.data.checkoutUrl;
        }
        else if(res.status === 400){
          console.log('bad request')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const {totalAmount, givenName, surName, items} = this.state
    console.log(items)
    return (
      <div>
        <h2>Now you can submit your order:</h2>
        <div>
          {items.map(item => <div key={item.name}>{item.name} {item.category}</div>)}
        </div>
        <form onSubmit={this.submitHandler}>
          <div>
            <p>Given name: <input type="text" name="givenName" placeholder="Given Name" onChange={this.changeHandler}/></p>
          </div>
          <div>
            <p>Surname: <input type="text" name="surName" placeholder="Surname" onChange={this.changeHandler}/></p>
          </div>
          <div>
            <p>Email: <input type="text" name="email" placeholder="Email" onChange={this.changeHandler}/></p>
          </div>
          <div>
            <p>Shipping Address: <input type="text" name="shipping" placeholder="Shipping Address" onChange={this.changeHandler}/></p>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
}

export default orders;
