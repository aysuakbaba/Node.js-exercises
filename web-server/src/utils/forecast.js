const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=617deebc390212b519ab538bf9903fb8&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect weather services' , undefined)
        }
        else if(response.body.error){
            callback('Unable to find location' , undefined)
        }
        else{
            undefined, response.body.current.weather_descriptions[0] + "It is currently " +
                    response.body.current.temperature +
                   " degrees out."
        }
    })
}



module.exports = forecast