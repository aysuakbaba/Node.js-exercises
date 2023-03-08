const path = require('path');
const express = require('express');
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location 
app.set('view engine' , 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aysu Akbaba'
    })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'If you need help you can contact with us via support engine.',
    title: 'Help Page',
    name: 'Aysu Akbaba'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Aysu Akbaba'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address term.'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if(error){
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({error})
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })

    })

    
  })

  // res.send({
  //   forecast: 'rainy',
  //   location: 'Bursa',
  //   address: req.query.address
  // });
});

app.get('/products', (req, res) =>  {
  if(!req.query.search){
    res.send({
      error: 'You must provide a search term.'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) =>{
  res.render('404page', {
    errorMessage: 'Help article is not found'
  });

})

app.get('*', (req,res) => {
  res.render('404page', {
    title: '404',
    name: 'Aysu Akbaba',
    errorMessage: '404 Not Found'
  });

})

app.listen(3000, () => {
  console.log('Server is up on 3000.');
  //This message never gonna display to someone in the browser. Just gonna display as a useful piece of information when running the application.
});
