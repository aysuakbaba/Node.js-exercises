const path = require('path');
const express = require('express');
const hbs = require('hbs')

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
  res.send({
    forecast: 'rainy',
    location: 'Bursa',
  });
});

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
