const express = require('express');
const expServer = express();
const httpServer = require('http').createServer(expServer);
const io = require('socket.io')(httpServer);
const port = 4000;


expServer.use( express.static(__dirname + '/build/') );

expServer.get('/Eva-Fireborn/pinboard/static/media/tempProfile.0ca70095.jpg', (request, response) => {
    console.log('Request: ', request.url)
    response.sendFile(__dirname + '/build/static/media/tempProfile.0ca70095.jpg')
});
/*
.all('*', ....)
response.status(404)
*/
expServer.get('/', (request, response) => {
    console.log('Request: ', request.url)
    response.sendFile(__dirname + '/public/index.html')

});

io.on('connection', socket => {
  let id=0;
  let message = 'hello';
	console.log('Server received new client connection: #' + id);
	socket.on('disconnect', () => {
		console.log(`Client #${id} disconnected from server`);
	})
	socket.on('chat message', data => {
		console.log(`Server received chat message from #${id}: `, data);
    data.senderId = id;
    socket.broadcast.emit('chat message', data);
	})
  socket.on('chat message', message => {
    io.emit('chat message', message);
  });

  // sending to individual socketid (private message)
  // io.to(socketId).emit('chat message', data);
})

// OBS! Starta httpServer i stället för expServer.
httpServer.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});
