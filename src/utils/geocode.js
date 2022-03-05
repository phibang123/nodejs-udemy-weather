const request = require("postman-request");

const geocode = (address, callback) =>
{ 
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ address }.json?limit=1&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoicGhpYmFuZyIsImEiOiJjbDBhcG53b2kwZW9hM2RvYWozc3V5cnNuIn0.6vYvgBjGW6clNivaWPn75A&limit=1`
  
  request({ url: url, json: true }, (err,repone) =>
  {
    if (err)
    {
      callback("loi con me no roi", undefined)
    }
    else if (repone.body.features.length === 0)
    { 
       callback("cái nay2 ko có giá trị" , undefined)
    }
    else
    {
      callback(undefined, {
        latitude: repone.body.features[0].center[0],
        longtitude: repone.body.features[0].center[1],
        location: repone.body.features[0].place_name   
      })
    }
  })
}


module.exports = geocode