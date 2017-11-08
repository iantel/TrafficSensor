var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    id: Number,
    name: String,
    max_capacity: Number,
    current_occupancy: Number,
    popular_hours:{
      eight: Number,
      nine: Number,
    },
    keywords: [
      String
    ],
    image: String
});

module.exports = mongoose.model('Rooms', RoomSchema);
