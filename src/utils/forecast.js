const request = require("request");

const forecast = (longitude, latitude, callback)=>{
    const url = "https://api.darksky.net/forecast/3f6a8b8221e9d5875192bf5fa4b4511e/" + longitude + "," + latitude + "?units=si";
    request({url, json: true}, (err, res, {error, code, daily, currently})=>{
        if(err)
            callback("Unable to connect to weather server!");
        else if(error)
            callback("Code: " + code + "\nError: " + error);
        else 
            callback(undefined, daily.data[0].summary + " It is currently " + currently.temperature + " degrees out. There is a " + currently.precipProbability + "% chance of rain.");
    });
}

module.exports = forecast;