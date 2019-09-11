const express = require('express');
const expServer = express();
const httpServer = require('http').createServer(expServer);
//const io = require('socket.io')(httpServer);
const port = 4000;


expServer.use( express.static(__dirname + '/build/') );

expServer.get('/Eva-Fireborn/pinboard/static/media/tempProfile.0ca70095.jpg', (request, response) => {
    console.log('Request: ', request.url)
    response.sendFile(__dirname + '/build/static/media/tempProfile.0ca70095.jpg')
});

/*.all('*', ....)
response.status(404)

expServer.get('/', (request, response) => {
    console.log('Request: ', request.url)
    response.sendFile(__dirname + '/build/index.html')

});

io.on('connection', socket => {
	console.log('Server received new client connection: #' + id);
	socket.on('disconnect', () => {
		console.log(`Client #${id} disconnected from server`);
	})
	socket.on('chat message', data => {
		console.log(`Server received chat message from #${id}: `, data);
		// Skicka vidare meddelandet till alla andra klienter
		data.senderId = id;
		socket.broadcast.emit('chat message', data);
	})
})*/

// OBS! Starta httpServer i stället för expServer.
httpServer.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});