const request = require('request');

const getForecast = (forecast, callback) => {
    
    const mapUrl = `https://api.darksky.net/forecast/3ccfe8c94c9891ce8b5290676ac59cec/${forecast.latitude},${forecast.longitude}`;
    
    console.log(mapUrl);
    request({url: mapUrl, json: true},(error, response) => {

        if (error) {
            callback('unable to fetch the details', undefined);
        } else if (response.body.error) {
            callback('wrong input');
        }  else {
            console.log(response);
            callback({
             data: `It is currently ${response.body.currently.temperature} degrees out.There is a ${response.body.currently.precipProbability}% chance of rain`
            })
        }
      })
  }

  module.exports = {
      getForecast : getForecast
  }