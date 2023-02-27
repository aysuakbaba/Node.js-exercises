const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set('view engine' , 'hbs')
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render("index", {
        title: 'Weather App',
        name: 'Aysu Akbaba'
    })
})

app.get("/help", (req, res) => {
  res.render("help", {
    message: 'If you need help you can contact with us via support engine.'
  })
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: 'About Page',
    name: 'Aysu Akbaba'
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "rainy",
    location: "Bursa",
  });
});

app.listen(3000, () => {
  console.log("Server is up on 3000.");
  //This message never gonna display to someone in the browser. Just gonna display as a useful piece of information when running the application.
});
