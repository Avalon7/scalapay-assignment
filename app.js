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
	  return res.json({
	  	data
	  })
	});
})

app.post('/orders', jsonParser, (req, res) =>{
console.log(typeof(req.body.totalAmount));
console.log(req.body.givenName);
console.log(req.body.surName);
console.log(req.body.items);
console.log(req.body.email);
console.log(req.body.phone);
console.log(req.body.address);
console.log(req.body.suburb);
console.log(req.body.postcode);
console.log(req.body.countryCode);

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
      "phoneNumber": req.body.phone,
      "givenNames": req.body.givenName,
      "surname": req.body.surName,
      "email": req.body.email
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
      "name": req.body.givenName + ' ' + req.body.surName,
      "line1": req.body.address,
      "suburb": req.body.suburb,
      "postcode": req.body.postcode,
      "countryCode": req.body.countryCode,
      "phoneNumber": req.body.phone
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
});
})
// app.use((req, res) => {
// 	res.status(404).sendFile('./views/404.html', { root: __dirname})
// })