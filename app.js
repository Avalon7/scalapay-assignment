const express = require('express');
const request = require('request');
//express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3002);

app.get('/', (req, res) => {
	res.render('index');
});

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

// app.post('/orders', (req, res) =>{

// })
// app.use((req, res) => {
// 	res.status(404).sendFile('./views/404.html', { root: __dirname})
// })