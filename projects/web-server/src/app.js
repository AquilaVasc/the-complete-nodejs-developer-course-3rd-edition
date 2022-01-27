const path = require('path');
const express = require('express');

const app = express();
const publicDirectoryPath = path.join(__dirname, './../public');

// needs to be exactly like below 'view engine'
app.set('view engine', 'hbs');

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
  res.send({
    forecast: "It's currently 9 degres",
    location: "New York"
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})