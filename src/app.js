const path = require('path');
const favicon = require("serve-favicon");
const express = require('express');
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
//app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(favicon(path.join(__dirname, "../public/img", "weather.png")));
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Alen Vlahovljak"
    });
});

app.get("/about", (req, res)=>{
    res.render("about", {
        title: "About me",
        name: "Alen Vlahovljak"
    });
});

app.get("/help", (req, res)=>{
    res.render("help", {
        helpText: "Hello World",
        title: "Help",
        name: "Alen Vlahovljak"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error: "You mast provide location address",
        });
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err)
            return res.send({err});
        forecast(latitude, longitude, (err, forecastData) => {
            if(err) 
                return res.send({err});
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get("/help/*", (req, res)=>{
    res.render("404", {name: "Alen Vlahovljak", title:"Help", error: "Help article not found"});
});

app.get("*", (req, res)=>{
    res.render("404", {name: "Alen Vlahovljak", title: "404", error: "Page not found"});
});


app.listen(port, () => {
    console.log('Server is up on port 3000.');
});