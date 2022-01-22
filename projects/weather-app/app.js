const request = require('request');

const search_text = 'Los Angeles'
const geo_api_domain = "https://api.mapbox.com"
const access_token_geo = "pk.eyJ1IjoiYXF1aWxhdmFzYyIsImEiOiJja3lxM2N5OGMwZnpyMnlxdG1vazNnaXRnIn0.14hJEpyu6cC9LV6uBtdTew";
const route = `/geocoding/v5/mapbox.places/${search_text}.json`
const geoApiUrl = `${geo_api_domain}${route}?access_token=${access_token_geo}&limit=1`;
request({url: geoApiUrl, json: true}, (error, response) => {
  if(error){
    console.log('Unable to connect geo location service!');
  }else{
    const features = response.body.features;
    if(features && features.length > 0){
      const latLongArray = features[0].center;
      console.log(`Lat: ${latLongArray[1]}. Long: ${latLongArray[0]}`);
    }else{
      console.log('Unable to find location. Try again with different term!');
    }
  }
});

const api_domain = 'http://api.weatherstack.com/current';
const access_key = '9b8357a61807f587bdb6396a5684137a';

const weatherApiUrl = `${api_domain}?access_key=${access_key}&query=34.0544,-118.2439&units=m`;

request({url: weatherApiUrl, json: true}, (error, response) => {
  if(error){
    console.log('Unable to connect to weather service!');
  }else if(response.body.error && response.body.error.code){
    console.log(response.body.error.info)
  }else{
    const current = response.body.current;
    if(current){
      console.log(`${current.weather_descriptions[0]}. It is crrently ${current.temperature} degress out. It feels like ${current.feelslike} degrees out.`);
    }
  }
});