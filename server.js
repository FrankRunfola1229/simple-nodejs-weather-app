const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = "96c763e2a91557d9f467f023c481c078";
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', {weather: null, error: null});
})

app.post('/', (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, (err, response, body) => {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    }
    else {
      let weather = JSON.parse(body)

      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } 
      else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(port, () => console.log(`listening on port ${port}!`))
