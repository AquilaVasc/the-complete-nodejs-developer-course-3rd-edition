const request = require('request');

const discoverCordinates = (search_text, callback) => {
  const geo_api_domain = "https://api.mapbox.com"
  const access_token_geo = "pk.eyJ1IjoiYXF1aWxhdmFzYyIsImEiOiJja3lxM2N5OGMwZnpyMnlxdG1vazNnaXRnIn0.14hJEpyu6cC9LV6uBtdTew";
  const route = `/geocoding/v5/mapbox.places/${encodeURIComponent(search_text)}.json`
  const url = `${geo_api_domain}${route}?access_token=${access_token_geo}&limit=1`;
  request({url, json: true}, (error, { body } = {}) => {
    if(error){
      callback(error);
    }else if(body.features.length === 0){
      callback("Unable to find location. Try another search");
    }else{
      const features = body.features;

      const latLongArray = features[0].center;
      callback(undefined, {
        latitude: latLongArray[1],
        longitude: latLongArray[0],
        location: features[0].place_name
      });
    }
  });
}

module.exports = discoverCordinates;