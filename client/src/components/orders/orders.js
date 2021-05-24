import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
  //dummy data for total price
      totalAmount: '20',
      givenName: '',
      surName: '',
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
     ],
     email: '',
     phone: '',
     address: '',
     suburb: '',
     postcode: '',
     countryCode: '',
     givenNameError: '',
     surNameError: '',
     emailError: '',
     phoneError: '',
     addressError: '',
     suburbError: '',
     postcodeError: '',
     countryCodeError: ''
}
class orders extends Component{

  constructor(){
    super();
    this.state = initialState;
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    const isValid = this.validate();
    if(isValid){
      axios
        .post('/orders', this.state)
        .then(res => {
          console.log(res.data)
          console.log(res.status)
          if(res.status === 200){
            console.log('status ok')
            window.location.href = res.data.data.checkoutUrl;
          }
          else if(res.status === 400){
            console.log('bad request')
          }
        })
        .catch(error => {
          console.log(error)
        })
        //then reset the form
        this.setState(initialState);
      }
  }

  validate = () => {
     let givenNameError = '';
     let surNameError = '';
     let emailError = '';
     let phoneError = '';
     let addressError = '';
     let suburbError = '';
     let postcodeError = '';
     let countryCodeError = '';
     let countryCodeArray = ['AU', 'IT', 'FR']

     if(!this.state.givenName){
      givenNameError = 'Givenname cannnot be empty';
     }

     if(!this.state.surName){
      surNameError = 'Surname cannnot be empty';
     }
     if(!this.state.phone){
      phoneError = 'Phone number is invalid';
     }
     if(!this.state.address){
      addressError = 'Address cannnot be empty';
     }
     if(!this.state.suburb){
      suburbError = 'Suburb cannnot be empty';
     }
     if(!this.state.postcode){
      postcodeError = 'Postcode cannnot be empty';
     }
     if(!this.state.countryCode || !countryCodeArray.includes(this.state.countryCode)){
      countryCodeError = 'Country code cannnot be empty or countrycode is invalid';
     }

     if(!this.state.email.includes('@')){
      emailError = 'Email is invalid';
     }

     if(emailError || givenNameError || phoneError || surNameError || addressError || suburbError || postcodeError || countryCodeError){
      this.setState({emailError, givenNameError, phoneError, surNameError, addressError, suburbError, postcodeError, countryCodeError});
      return false;
     }

     return true;
  }

  render() {
    const {totalAmount, givenName, surName, items, email, phone, address, suburb,  postcode, countryCode}= this.state
    console.log(items)
    return (
      <div>
        <h2>Now you can submit your order:</h2>
        <div>
          {items.map(item => <div key={item.name}>{item.name} {item.category} {item.subcategory[0]} {item.subcategory[1]}</div>)}
        </div>
        <form onSubmit={this.submitHandler}>
          <div>
            <p>Given name: <input type="text" name="givenName" onChange={this.changeHandler}/></p>
            <div style={{ frontSize: 12, color: "red"}}>
              {this.state.givenNameError}
            </div>
          </div>
          <div>
            <p>Surname: <input type="text" name="surName"  onChange={this.changeHandler}/></p>
            {this.state.surNameError ? (
              <div style={{ frontSize: 12, color: "red"}}>
                {this.state.surNameError}
              </div>
              ) : null}
          </div>
          <div>
            <p>Email: <input type="text" name="email" onChange={this.changeHandler}/></p>
            <div style={{ frontSize: 12, color: "red"}}>
              {this.state.emailError}
            </div>
          </div>
          <div>
            <p>Phone Number: <input type="text" name="phone"  onChange={this.changeHandler}/></p>
            <div style={{ frontSize: 12, color: "red"}}>
              {this.state.phoneError}
            </div>
          </div>
          <div>
            <p>Line 1: <input type="text" name="address"  onChange={this.changeHandler}/></p>
            <div style={{ frontSize: 12, color: "red"}}>
              {this.state.addressError}
            </div>
          </div>
          <div>
            <p>Suburb: <input type="text" name="suburb"  onChange={this.changeHandler}/></p>
            <div style={{ frontSize: 12, color: "red"}}>
              {this.state.suburbError}
            </div>
          </div>
          <div>
            <p>Postcode: <input type="text" name="postcode" onChange={this.changeHandler}/></p>
            <div style={{ frontSize: 12, color: "red"}}>
              {this.state.postcodeError}
            </div>
          </div>
          <div>
            <p>Country Code: <input type="text" name="countryCode" onChange={this.changeHandler}/></p>
            <div style={{ frontSize: 12, color: "red"}}>
              {this.state.countryCodeError}
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
}

export default orders;
