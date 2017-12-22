/**
 * routes.js
 * Make sure that the wildcard 404 route is at the end.
 */

var express = require('express');
var router = express.Router();

var User  = require('./models/user.js');
var Event = require('./models/event.js');

module.exports = function(app, passport) {
    app.get('/', function (req, res) {
  	    res.render('index', { title:"CVU Study Form" });
    });

    //Depending on how the webapp is implemented, we may not want random people creating an account.
    //This code is useful, however, so I will use it.
    app.get('/signup', function (req, res) {
        res.render('signup', { title: "Sign Up" });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash    : true
    }));

    app.get('/login', function (req, res) {
        res.render('login', { title: "Log in" });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        messages = req.user.local.messages;
        if (messages[messages.length - 3]) {
            message_2 = messages[messages.length - 3];
        }
        else {
            message_2 = "Sample message";
        }
        if (messages[messages.length - 2]) {
            message_1 = messages[messages.length - 2];
        }
        else {
            message_1 = "Sample message";
        }
        if (messages[messages.length - 1]) {
            message_0 = messages[messages.length - 1];
        }
        else {
            message_0 = "Sample message";
        }

        Event.find({}, function(err, events) {
            events = events;
            console.log(events);
            console.log(events[0]._id);
            if (events[events.length - 3]) {
                event_name_2 = events[events.length - 3].name;
                event_description_2 = events[events.length - 3].description;
                event_id_2 = events[events.length - 3]._id;
            }
            else {
                event_name_2 = "Sample event name";
                event_description_2 = "Sample event description";
            }
            if (events[events.length - 2]) {
                event_name_1 = events[events.length - 2].name;
                event_description_1 = events[events.length - 2].description;
                event_id_1 = events[events.length - 2]._id;
            }
            else {
                event_name_1 = "Sample event name";
                event_description_1 = "Sample event description";
            }
            if (events[events.length - 1]) {
                event_name_0 = events[events.length - 1].name;
                event_description_0 = events[events.length - 1].description;
                event_id_0 = events[events.length - 1]._id;
            }
            else {
                event_name_0 = "Sample event name";
                event_description_0 = "Sample event description";
            }

            console.log(req.user.local.role);
            if (req.user.local.role == "Teacher") {
                res.render('teacher',
                           {
                               title: req.user.local.role,
                               message_0: message_0,
                               message_1: message_1,
                               message_2: message_2,
                               event_name_0: event_name_0,
                               event_description_0: event_description_0,
                               event_id_0: event_id_0,
                               event_name_1: event_name_1,
                               event_description_1: event_description_1,
                               event_id_1: event_id_1,
                               event_name_2: event_name_2,
                               event_description_2: event_description_2,
                               event_id_2: event_id_2
                           });
            }
            if (req.user.local.role == "Student") {
                // res.render('student', { title: req.user.local.role }); I've made the student and the teacher the same pages.
                res.render('teacher',
                           {
                               title: req.user.local.role,
                               message_0: message_0,
                               message_1: message_1,
                               message_2: message_2,
                               event_name_0: event_name_0,
                               event_description_0: event_description_0,
                               event_id_0: event_id_0,
                               event_name_1: event_name_1,
                               event_description_1: event_description_1,
                               event_id_1: event_id_1,
                               event_name_2: event_name_2,
                               event_description_2: event_description_2,
                               event_id_2: event_id_2
                           });
            }
        });
    });

    app.get('/create', isTeacher, function(req, res) {
        res.render('create', { title: "Creating Activity" });
    });


    addMessage = function(user, message) {
        console.log(user._id);
        user.local.messages.push(message);
        user.save();
    };
    app.post('/create', isTeacher, function(req, res) {
        var newEvent = new Event();
        newEvent.name = req.body.activity_title;
        console.log("Event name: " + req.body.activity_title);
        newEvent.description = req.body.activity_description;
        console.log("Event description: " + req.body.activity_description);
        newEvent.date = req.body.datepicker;
        console.log("Event date: " + req.body.datepicker);
        newEvent.overseer = req.user.local.email;
        newEvent.save(function(err) {
            if (err)
                throw err;
        });
        addMessage(req.user, "You created an event! <br/>Name: " + req.body.activity_title + "<br/>Description: " + req.body.activity_description);
        res.redirect('/profile');
    });

    //This code must be included last, because any route that comes after it will not be accessible, and will
    //return an error 404 message. Don't be stupid. Don't put code after here. I know I'll do it anyway.

    app.get('*', function(req, res, next){
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.render('404', { title:"Error 404, Page not found.", url: req.url });
            return;
        }
    });
};

/**
 * Route Middleware functions:
 */

// Snippet I found from a tutorial at https://scotch.io/tutorials/easy-node-authentication-setup-and-local
// Licensed under MIT (along with other depends), so it's OK to use for this project. All code not marked as
// a snipped from a tutorial was written by Milo Cress, though some of it may be boilerplate to the extent
// that my writing it doesn't add any originality to it. Most of the bare-bones setup is like this, but the
// core code that drives the webapp is (to the best of my knowledge) quite original. This is the kind of
// project, that if maintained well and kept modular, could serve as a template not only for future
// endeavors in our own school, but also for schools, businesses, and organizations in a larger community.
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

function isTeacher(req, res, next) {
    if (isLoggedIn && req.user.local.role == "Teacher") {
        return next();
    }

    res.redirect('/');
}
