const request = require('request');

const retrieveWeather = ({ latitude, longitude } = {}, callback) => {
  const api_domain = 'http://api.weatherstack.com/current';
  const access_key = '9b8357a61807f587bdb6396a5684137a';

  const url = `${api_domain}?access_key=${access_key}&query=${latitude},${longitude}&units=m`;

  request({url, json: true}, (error, { body } = {}) => {
    if(error){
      callback('Unable to connect to weather service!')
    }else if(body.error && body.error.code){
      callback(body.error.info)
    }else{
      const current = body.current;
      if(current){
        const { weather_descriptions, temperature, feelslike, humidity} = current;
        callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%.`);
      }
    }
  });

}

module.exports = retrieveWeather;