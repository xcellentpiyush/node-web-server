const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append the log to file');
        }
    });
    next();
});

app.use((request, response, next) => {
    response.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('home.hbs', {
        welcomeMessage: 'Welcome Piyush',
        pageTitle: 'Home Page'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Something went wrong!',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

// git init - initialise git in this repository
// git status - to get the status of each file and folder inside
//              this repository that whether it is commited or not.
// git add filename - by this command we are telling git that we want you to track this file once commit is done.