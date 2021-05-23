const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')
//express app
const app = express();

let jsonParser = bodyParser.json()
// register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3002);

app.get('/', (req, res) => {
	res.render('index');
});

//handle get request to get configurations
app.get('/configurations', (req, res) =>{
	const options = {
  	'method': 'GET',
  	'url': 'https://staging.api.scalapay.com/v2/configurations',
  	'headers': {
	    'Accept': 'application/json',
	    'Authorization': 'Bearer qhtfs87hjnc12kkos'
	  }
	};
	request(options, function (error, response) {
	  if (error) throw new Error(error);
	  const data = JSON.parse(response.body);
	  console.log(data);
	  // res.render('display', {data})
	  return res.json({
	  	data
	  })
	});
})

app.post('/orders', jsonParser, (req, res) =>{
console.log(typeof(req.body.totalAmount));
console.log(req.body.givenName);
console.log(req.body.surName);
console.log(req.body.itemList);
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://staging.api.scalapay.com/v2/orders',
  'headers': {
    'Accept': 'application/json',
    'Authorization': 'Bearer qhtfs87hjnc12kkos',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "totalAmount": {
      "amount": req.body.totalAmount,
      "currency": "EUR"
    },
    "consumer": {
      "phoneNumber": "0400000001",
      "givenNames": "Joe",
      "surname": "Consumer",
      "email": "test@scalapay.com"
    },
    "billing": {
      "name": "",
      "line1": "",
      "suburb": "",
      "postcode": "",
      "countryCode": "",
      "phoneNumber": ""
    },
    "shipping": {
      "name": "Joe Consumer",
      "line1": "Via della Rosa, 23",
      "suburb": "Montelupo Fiorentino",
      "postcode": "50056",
      "countryCode": "IT",
      "phoneNumber": "0400000000"
    },
    "items": req.body.items,
    "discounts": [
      {
        "displayName": "10% Off",
        "amount": {
          "amount": "3.00",
          "currency": "EUR"
        }
      }
    ],
    "merchant": {
      "redirectConfirmUrl": "https://portal.staging.scalapay.com/success-url",
      "redirectCancelUrl": "https://portal.staging.scalapay.com/failure-url"
    },
    "merchantReference": "merchantOrder-1234",
    "taxAmount": {
      "amount": "3.70",
      "currency": "EUR"
    },
    "shippingAmount": {
      "amount": "10.00",
      "currency": "EUR"
    },
    "orderExpiryMilliseconds": 6000000
  })

};
console.log(options)
request(options, function (error, response) {
  if (error) throw new Error(error);
  const data = JSON.parse(response.body);
  console.log(data);
  return res.json({
  	data
  })
  // return data;
});
})
// app.use((req, res) => {
// 	res.status(404).sendFile('./views/404.html', { root: __dirname})
// })