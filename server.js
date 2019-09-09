const express = require('express');
const expServer = express();
const httpServer = require('http').createServer(expServer);
const io = require('socket.io')(httpServer);
const port = 6000;


expServer.use( express.static(__dirname + '/public/') );

/*io.on('connection', socket => {
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