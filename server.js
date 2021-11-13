// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    var mascots = [
        { name: 'Alok Prasad', organization: "Hackstreet warriors", birth_year: 2001},
        { name: 'Keshav Gautam', organization: "Hackstreet warriors", birth_year: 2001}
    ];
    var tagline = "Car pooling application";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    });
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');
