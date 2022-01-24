const discoverCordinates = require('./utils/discoverCordinates');
const retrieveWeather = require('./utils/retrieveWeather');

const argv = process.argv;

const locationArg = argv.find((arg) => {
  return arg.includes('--location') === true;
});

const location = locationArg ? locationArg.split('=')[1]: undefined;

if(location){
  discoverCordinates(location, (error, data) => {
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
}else{
  console.log('Please provide an address');
}