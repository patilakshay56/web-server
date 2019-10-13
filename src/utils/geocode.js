const request = require('request');

const geoCode = (address, callback) => {
    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWtzaGF5cGEiLCJhIjoiY2sxa3h3enMwMDB4MDNsbG4xbzB6Z3B0ZCJ9.e8yD2BsvHQ89vULkELn34A&limit=1`;
    
    console.log(mapUrl);
    request({url: mapUrl, json: true},(error, response) => {

        if (error) {
            callback('unable to fetch the details', undefined);
        } else if (response.body.features.length === 0) {
            callback('wrong input');
        }  else {
            callback({
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
      })
  }

  module.exports = {
      geoCode : geoCode
  }