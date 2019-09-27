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
		api.disconnect();
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

expServer.get('/getAllAdsByUser/:id', (request, response) => {
	let id = request.params.id
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getAllAdsByUser(id, res => {
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

expServer.get('/ApiGetAllMsgForUser/:userId', (request, response) => {
	let userId = request.params.userId;
	console.log('server /ApiGetAllMsgForUser', request.params.userId);
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getAllMessagesForUser(userId, res => {
		console.log('server /ApiGetAllMsgForUser send response', res);
		response.send({
			status: 200,
			body: res
		})
		api.disconnect()
	})
	// query db: alla meddelanden som har userId som sender eller reciever
	// response.send
});


//getting and saving messeges to db
expServer.get('/ApiGetMessagesForAd/:adId/:userId', (request, response) => {
	let userId = request.params.userId;
	let adId = request.params.adId;
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	// TODO: fixa ad id - bör skickas med querystring
	api.getMessagesForAd(adId, userId, res => {
		response.send({
			status: 200,
			body: res
		})
		api.disconnect()
	})
})

expServer.post('/ApiPostNewMsg', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	console.log('requestbody: ', request.body)
	api.createMsg(request.body, res => {
		response.send({
			status: 200,
			body: res
		})
		api.disconnect()
	})
})

expServer.post('/ApiUpdateMsg', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.updateMessage(request.body.id, request.body.messages, res => {
		response.send({
			status: 200,
			body: res
		})
		api.disconnect()
	})
})

expServer.post('/ApiUpdateMsg', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	console.log('requestbody: ', request.body.id);
	console.log('body.msg: ', request.body.messages);
	api.updateMessage(request.body.id, request.body.messages, res => {
		response.send({
			status: 200,
			body: res
		})
		api.disconnect()
	})
})


expServer.use(express.static(__dirname + '/build/'));


expServer.get('/', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/public/index.html')

});


let connectedUsers = [];
io.on('connection', socket => {
	const sessionID = socket.id;
	console.log('connectedUsers: ', connectedUsers);


	socket.on('userID', id => {
		console.log('socket.id: ', socket.id, 'id for user: ', id)
		connectedUsers.push({ sessionID, userID: id });
	})
	/*
	socket.on('chat message', data => {
		if (connectedUsers.find(user => user.userID === ))
			io.to(sessionID).emit('chat message', data);
	})
	*/
	socket.on('disconnect', () => {
		console.log(`Client #${sessionID} disconnected from server`);
	})
})

// OBS! Starta httpServer i stället för expServer.
httpServer.listen(port, '127.0.0.1', () => {
	console.log(`Server is listening on port ${port}...`);
});
