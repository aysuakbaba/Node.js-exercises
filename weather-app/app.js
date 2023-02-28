// console.log('Starting')

// setTimeout(() => {
//     console.log('2 Second Timer')
// }, 2000)

// setTimeout(() => {
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stopping')


const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=617deebc390212b519ab538bf9903fb8&query=37.8267,-122.4233&units=f'

request({ url: url, json: true}, (error, response) => {
    console.log("It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out.")

})


const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoiYXlzdWFrYmFiYSIsImEiOiJjbGVvNTk4aWkxbHl2M3luNHFtemR6ZXI0In0.vVT2hxlV8f1SPdiNhGAGdw&limit=1'
request({ url:geocodeURL, json: true }, (error,response) => {
    if(error){
        console.log('Unable to connect the location services')
    }
    else if(response.body.features.length === 0){
        console.log('Unable to find location. Try another search.')
    }
    else{
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log('Latitude: ' + latitude+ ', Longitude: ' + longitude)

    }
    

})
