const discoverCordinates = require('./utils/discoverCordinates');
const retrieveWeather = require('./utils/retrieveWeather');

discoverCordinates('Los Angeles', (error, data) => {
  if(error){
    console.log('Error', error);
  }else{
    retrieveWeather(data, (error, data) => {
      if(error){
        console.log('Error', error);  
      }else{
        console.log('Data', data)
      }
    })
  }
});