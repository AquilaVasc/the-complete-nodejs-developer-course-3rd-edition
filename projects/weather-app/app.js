const discoverCordinates = require('./utils/discoverCordinates');
const retrieveWeather = require('./utils/retrieveWeather');

discoverCordinates('Los Angeles', (error, data) => {
  if(error){
    return console.log('Error', error);
  }

  retrieveWeather(data, (error, forecastData) => {
    if(error){
      return console.log('Error', error);  
    }

    console.log(data.location);
    console.log(forecastData);
  })
});