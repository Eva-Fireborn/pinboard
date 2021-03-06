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

expServer.get('/removeUserByID/:id', (request, response) => {
	let id = request.params.id
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.deleteUser(id, res => {
		response.send(
			JSON.stringify(res)
		)
		api.disconnect();
	})
})

expServer.post('/ApiUpdateUser', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.updateUser(request.body, res => {
		response.send({
			status: 200,
			body: {
				res
			}
		})
		api.disconnect()
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
	console.log(id, 'this is params id')
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	api.getAllAdsByUser(id, ads => {
		console.log('this is has to be our ads', ads)
		response.send({
			status: 200,
			body: ads
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

expServer.post('/ApiPostNewMsg', (request, response) => {
	let api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");

	request.body = { ...request.body, timeStamp: new Date() }
	request.body.message[0] = { ...request.body.message[0], timeStamp: new Date() }
	console.log('requestbody: ', request.body);

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


expServer.use(express.static(__dirname + '/build/'));

expServer.get('/', (request, response) => {
	console.log('Request: ', request.url)
	response.sendFile(__dirname + '/public/index.html')

});

let onlineUsers = [];
io.on("connection", async (socket) => {
	const sessionID = socket.id;
	const api = new API("mongodb+srv://test:test@cluster0-tuevo.mongodb.net/test?retryWrites=true&w=majority");
	console.log('user connected: ', sessionID);

	socket.on('initUser', userID => {
		if (onlineUsers.filter(user => user.userID === userID).length === 0) {
			onlineUsers.push({ sessionID, userID });
			api.getAllMessagesForUser(userID, res => {
				res.forEach(s => socket.join(s._id));
				socket.emit('getHistory', res);
				api.disconnect()
			});
		}
		console.log('added new user to onlineUsers! ', onlineUsers);
	})

	socket.on('sendMsg', payload => {
		api.updateMessage(payload.objId, payload.newMessage, payload.senderId, res => {
			api.disconnect()
		})
		let msg = {
			msg: payload.newMessage,
			senderId: payload.senderId,
			timeStamp: new Date()
		}
		socket.to(payload.objId).emit('chat', msg); // to "all" in chatroom
		socket.emit('chat', msg); // to self
	})

	socket.on('disconnect', () => {
		onlineUsers.splice(onlineUsers.findIndex(user => user.sessionID === sessionID), 1);
		console.log(`Client #${sessionID} disconnected. Still online: `, onlineUsers);
	})
});

// OBS! Starta httpServer i stället för expServer.
httpServer.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});
