import React, { useState, useEffect } from "react";
import MsgConversations from './MsgConversations';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

const MsgView = ({ isLoggedIn }) => {
	const [message, setMessage] = useState('');
	const [conversationHistory, setConversationHistory] = useState(null);
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [receiverID, setReceiverID] = useState(null);

	console.log('Viktor test #1..');

	useEffect(() => {
		console.log('Viktor test #2..');

		if (isLoggedIn) {
			socket.emit('userID', isLoggedIn._id);
			socket.emit('initHistory');
			socket.on('getHistory', history => setConversationHistory(history));
		}
	}, [isLoggedIn])

	const addMessageButton = e => {
		let msgObject = {
			message: message,
			senderID: isLoggedIn._id,
			ReceiverID: receiverID
		}

		setMessage("");
		//setSelectedConversation([...selectedConversation, msgObject])
		socket.emit('sendMessage', msgObject);
	};

	const getConversations = msg => setSelectedConversation(msg);
	const handleChangeMessage = e => setMessage(e.target.value);

	let allMessages;
	if (selectedConversation) {
		allMessages = selectedConversation.message.map((m, index) => {
			if (m.msgId === isLoggedIn._id)
				return (<div className="msgSelf" key={index}>{m.msg}</div>);
			else
				return (<div className="msgOther" key={index}>{m.msg}</div>);
		});
	}

	let history;
	if (conversationHistory) {
		history = conversationHistory.map((msg, key) => {
			console.log('msg: ', msg);

			return (<MsgConversations
				ads={msg} key={key}
				getConversations={getConversations}
			/>)
		})
	}

	return (
		<div id="wrapper">
			<aside>
				{history}
			</aside>

			<main id="msg">
				{allMessages}

				<textarea id="textMessage" type="text"
					value={message}
					onChange={handleChangeMessage}
					placeholder="Skriv ditt meddelande här" />

				<button className="call" onClick={addMessageButton}>
					Skicka
				</button>
			</main>
		</div>
	)
};

export default MsgView;