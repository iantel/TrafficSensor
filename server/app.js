var express = require('express');
var app = express();

app.get('/', function (req, res) {
	res.send('Hello World!');

});

app.listen(3000, () => {
	console.log('listening on 3000')
})


// Route for get/Post requests for "rooms".
app.use('/rooms', require('./controllers/rooms').router);
app.use('/get_rooms', require('./controllers/getRooms').router);
