const express = require('express');
const expServer = express();
const httpServer = require('http').createServer(expServer);
//const io = require('socket.io')(httpServer);
const port = 4000;
const API = require('./bkd/data');
const bodyParser = require('body-parser')
expServer.use(
	bodyParser.urlencoded({
	  extended: true
	})
  )
  
  expServer.use(bodyParser.json())


expServer.use('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

expServer.get('/Eva-Fireborn/pinboard/static/media/tempProfile.0ca70095.jpg', (request, response) => {
    console.log('Request: ', request.url)
    response.sendFile(__dirname + '/build/static/media/tempProfile.0ca70095.jpg')
});

expServer.post('/ApiLogInNewUser', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.createUser(request.body , res => {
		console.log(res)
		response.send({
			status: 200
		})
	})
})
expServer.post('/ApiLogInUser', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getUser(request.body , res => {
		console.log(res)
		response.send({
			status: 200
		})
	})
})
expServer.get('/ApiGetAllAds', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getAllAds( res => {
		response.send({
			status: 200,
			body: res
		})
	})	
})

expServer.post('/ApiPostNewAd', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.createAd(request.body, res => {
		response.send({
			status: 200
		})
	})
})

expServer.use( express.static(__dirname + '/build/') );

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