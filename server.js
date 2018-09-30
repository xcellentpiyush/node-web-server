const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

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

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

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

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// git init - initialise git in this repository.
// git status - to get the status of each file and folder inside
//              this repository that whether it is commited or not.
// git add filename - by this command we are telling git that we want you to track this file once commit is done.
// git commit -m 'Any commit message'

// ssh-keygen -t rsa -b 4096 -C 'xcellent.piyush@gmail.com' - To generate the ssh key.
// ls -al ~/.ssh - To check for any existing ssh key.
// eval "$(ssh-agent -s)" - To start the ssh agent so that it knows the key.
// ssh-add ~/.ssh/id_rsa - We have to tell where the ssh key is.
// clip < ~/.ssh/id_rsa.pub - Copies the contents of the id_rsa.pub file to your clipboard.
// paste the ssh key in the github. Then add key.
// ssh -T git@github.com - To test our connection with github.
// after all these steps create repository in github. Then run the 2 commands that are showing in the website.
// create account in heroku
// after that open https://toolbelt.heroku.com to download the installer for heroku command line.
// heroku --help - to check if heroku is installed properly.
// heroku login - login with heroku
// heroku keys:add - add our ssh key to heroku server
// heroku keys (followed by our email address): remove - remove ssh key from heroku server.
// ssh -v git@heroku.com - test connection with heroku.