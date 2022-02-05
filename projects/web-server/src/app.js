const path = require('path');
const express = require('express');
const hbs = require('hbs');

const discoverCordinates = require('./utils/discoverCordinates');
const retrieveWeather = require('./utils/retrieveWeather');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './../public');
const viewsPath = path.join(__dirname, './../templates/views');
const partialsPath = path.join(__dirname, './../templates/partials');

// Setup handlebars engine and views location, respectively
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Aquila Vasconcelos'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Aquila Vasconcelos'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Looking for Help?',
    message: 'This is my help page'
  })
});

app.get('/weather', (req, res) => {
  const { address } = req.query;

  if(!address){
    return res.send({
      error: 'You must provide an adress!'
    });
  }

  discoverCordinates(address, (error, data) => {
    if(error){
      return res.send({
        error
      });
    }
  
    retrieveWeather(data, (error, forecastData) => {
      if(error){
        return res.send({
          error
        }); 
      }
  
      res.send({
        forecast: forecastData,
        location: data.location,
        address
      });
    })
  }); 
});

app.get('/products', (req, res) => {
  const { search , rating} = req.query;
  if(!search) {
    return res.send({
      error: 'You must provide a search term!'
    });
  }

  res.send({
    products: [],
    search
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404', 
    errorMessage: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})