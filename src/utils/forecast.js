const request = require("postman-request");

const forcast = (address, callback) =>
{ 
  const url = `http://api.weatherstack.com/current?access_key=09027946efa6faffd85b6e36b65f30b2&query=${ address.longtitude },${ address.latitude }&units=m`

  request({ url: url, json: true }, (err,reponse) =>
  {
    if (err)
    {
      callback("loi con me no roi", undefined)
    }
    else if (reponse.body.error)
    { 
       callback("cái nay2 ko có giá trị" , undefined)
    }
    else
    {
     callback(undefined, reponse.body.current.weather_descriptions[0] + ". It is currently " + reponse.body.current.temperature + " degress out. There is a "+ reponse.body.current.precip + "%")
    }
  })
}

module.exports = forcast