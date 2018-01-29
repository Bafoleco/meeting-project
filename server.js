console.log('entered');
const express = require('express');
const app = express();
const port = process.env.PORT;

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


mongoose.connect("mongodb://heroku_zn4rp3qx:unsecure1@ds117868.mlab.com:17868/heroku_zn4rp3qx");
console.log('17');
require('./config/passport')(passport);

app.set('port', process.env.PORT);
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static('public'));

app.set('view engine', 'pug');


app.use(session({ 
    secret: 'undone cape discount magma outnumber repeater',
    resave: true,
    saveUninitialized: true
})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes.js')(app, passport);

app.listen(port, () => console.log('CVU Scheduler listening on port 300'));
