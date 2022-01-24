const https = require('https');

const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/San%20Francisco.json?access_token=pk.eyJ1IjoiYXF1aWxhdmFzYyIsImEiOiJja3lxM2N5OGMwZnpyMnlxdG1vazNnaXRnIn0.14hJEpyu6cC9LV6uBtdTew";

const request = https.request(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data = data + chunk.toString();
  });

  response.on('end', () => {
    const body = JSON.parse(data);
    console.log(body);
  });
})

request.on('error', (error) => {
  console.log('An error', error);
});

request.end();