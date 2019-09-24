const express = require('express');
const expServer = express();
const httpServer = require('http').createServer(expServer);
const io = require('socket.io')(httpServer);
const port = 4000;
const API = require('./bkd/data');
const bodyParser = require('body-parser')
expServer.use(
	bodyParser.urlencoded({
		extended: true
	})
)

expServer.use(bodyParser.json())


expServer.use('/', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

expServer.get('/Eva-Fireborn/pinboard/static/media/tempProfile.0ca70095.jpg', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/static/media/tempProfile.0ca70095.jpg')
});

expServer.get('/home', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});
expServer.get('/annonser', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});
expServer.get('/skapaannons', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});
expServer.get('/frågorochsvar', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});
expServer.get('/profil', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});
expServer.get('/meddelanden', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});
expServer.get('/betalning', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});
expServer.get('/anmäl-annons', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});
expServer.get('/användarvillkor', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});
expServer.get('/kundsäkerhet', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/build/index.html')
});

expServer.post('/ApiLogInNewUser', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.createUser(request.body, res => {
		response.send({
			status: 200,
			body: {
				res
			}
		})
		api.disconnect()
	})
})

expServer.post('/ApiLogInUser', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getUser(request.body, res => {
		response.send({
			status: 200,
			body: {
				res
			}
		})
		api.disconnect()
	})
})

expServer.get('/ApiGetUserForAd/:id', (request, response) => {
	let id = request.params.id
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getUserForAd(id, res => {
		console.log(res);
		response.send(
			JSON.stringify(res)
		)
	})
})

expServer.get('/getUserByID/:id', (request, response) => {
	let id = request.params.id
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getUserByID(id, res => {
		response.send(
			JSON.stringify(res)
		)
		api.disconnect();
	})
})

expServer.get('/ApiGetAllAds', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getAllAds(res => {
		response.send({
			status: 200,
			body: res
		})
		api.disconnect()
	})
})

expServer.get('/ApiGetLatest', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getTwentyNewestAds(res => {
		response.send({
			status: 200,
			body: res
		})
		api.disconnect()
	})
})

expServer.post('/ApiPostNewAd', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.createAd(request.body, res => {
		console.log(res)
		response.send({
			status: 200
		})
		api.disconnect()
	})
})

//getting and saving messeges to db
expServer.get('/ApiGetMessagesForAd', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	// TODO: fixa ad id - bör skickas med querystring
	api.getMessagesForAd(null, res => {
		response.send({
			status: 200,
			body: res
		})
		api.disconnect()
	})
})

expServer.post('/ApiPostNewMsg', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.createMsg(request.body, res => {
		response.send({
			status: 200
		})
		api.disconnect()
	})
})

//upDateMsg funktion för bef. konversation.



expServer.use(express.static(__dirname + '/build/'));

/*.all('*', ....)
response.status(404)
*/
expServer.get('/', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/public/index.html')

});
//vilka är inloggade, socket objekt.
//rout sendDirectMsg annons och person behöver hittas.

//skapa en lista för inloggade i connect.
io.on('connection', socket => {
	let connectedUsers = [];
	let id = 0;
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
httpServer.listen(port, '127.0.0.1', () => {
	console.log(`Server is listening on port ${port}...`);
});