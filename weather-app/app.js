const geocode = require("./utils.js/geocode")
const forecast = require("./utils.js/forecast")






// const url =
//   "http://api.weatherstack.com/current?access_key=617deebc390212b519ab538bf9903fb8&query=37.8267,-122.4233&units=f";

// request({ url: url, json: true }, (error, response) => {
//   console.log(
//     "It is currently " +
//       response.body.current.temperature +
//       " degrees out. It feels like " +
//       response.body.current.feelslike +
//       " degrees out."
//   );
// });




geocode('Bursa', (error, data) => {
    console.log('Error' , error)
    console.log('Data' , data)
    forecast(data.latitude, data.longitude, (error,data) => {
        console.log('Error', error)
        console.log('Data', data)
    })
})

