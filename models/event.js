// models/event.js
var mongoose = require("mongoose");

var eventSchema = mongoose.Schema({
    name         : String,
    room         : String, // Ex: "43a"
    overseer     : String, // Email of teacher or student who created the activity
    description  : String
});

eventSchema.methods.isConflicting = function (eventIDa, eventIDb) { //checks whether two events conflict.
    return true;
};

module.exports = mongoose.model('Event', eventSchema);
