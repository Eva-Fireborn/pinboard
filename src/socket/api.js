import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4000/");

const chat = cb => {
	socket.on("chat", msg => cb(msg));
}

const initUser = userID => {
	socket.emit('initUser', userID)
}

const sendMsg = payload => {
	socket.emit('sendMsg', payload)
}

const getHistory = cb => {
	socket.on('getHistory', history => cb(history))
}

export { chat, sendMsg, initUser, getHistory };