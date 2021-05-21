const express = require('express');
const request = require('request');
//express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/display', (req, res) =>{
	var options = {
  	'method': 'GET',
  	'url': 'https://staging.api.scalapay.com/v2/configurations',
  	'headers': {
	    'Accept': 'application/json',
	    'Authorization': 'Bearer qhtfs87hjnc12kkos'
	  }
	};
	request(options, function (error, response) {
	  if (error) throw new Error(error);
	  const info = JSON.parse(response.body);
	  res.render('display', {info})
	  console.log(response.body);
	});
	// res.sendFile('./views/display.html', { root: __dirname});
})

app.use((req, res) => {
	res.status(404).sendFile('./views/404.html', { root: __dirname})
})