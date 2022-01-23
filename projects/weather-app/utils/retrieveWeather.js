const request = require('request');

const retrieveWeather = (cordinates, callback) => {
  const api_domain = 'http://api.weatherstack.com/current';
  const access_key = '9b8357a61807f587bdb6396a5684137a';

  const weatherApiUrl = `${api_domain}?access_key=${access_key}&query=${cordinates.latitude},${cordinates.longitude}&units=m`;

  request({url: weatherApiUrl, json: true}, (error, response) => {
    if(error){
      callback('Unable to connect to weather service!')
    }else if(response.body.error && response.body.error.code){
      callback(response.body.error.info)
    }else{
      const current = response.body.current;
      if(current){
        callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degress out. It feels like ${current.feelslike} degrees out.`);
      }
    }
  });

}

module.exports = retrieveWeather;