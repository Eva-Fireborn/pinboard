import React, { useState, useEffect } from "react";
import MsgConversations from './MsgConversations';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

const MsgView = ({ isLoggedIn }) => {
	const [message, setMessage] = useState('');
	const [conversationHistory, setConversationHistory] = useState(null);
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [receiverId, setReceiverId] = useState(null);
	console.log(`
	Todo:
	> hämta timestamp efter sparad i db och skicka till användare
	> vissa ditt egna skickade medelande
	> fixa notification numer grej.
	> styling
	`)

	useEffect(() => {
		if (isLoggedIn) {
			socket.emit('initHistory', isLoggedIn._id);
			socket.on('getHistory', history => setConversationHistory(history));
		}
	}, [isLoggedIn])

	const addMessageButton = e => {
		let msgObject = {
			newMessage: message,
			senderId: isLoggedIn._id,
			receiverId: receiverId,
			objId: selectedConversation._id,
			msgHistory: selectedConversation.message
		}


		setMessage("");
		socket.emit('sendMessage', msgObject);
		/*
		socket.on('getMsg', msg => setSelectedConversation({
			message: [...selectedConversation.message, msg]
		}));
		*/
	};

	const getConversations = msg => {
		setSelectedConversation(msg)
		if (msg.senderId === isLoggedIn._id)
			setReceiverId(msg.recieverId)
		else
			setReceiverId(msg.senderId)
	};
	const handleChangeMessage = e => setMessage(e.target.value);

	let allMessages;
	if (selectedConversation) {
		allMessages = selectedConversation.message.map((m) => {
			if (m.senderId === isLoggedIn._id)
				return (<div className="msgSelf" key={m.timeStamp}>{m.msg}</div>);
			else
				return (<div className="msgOther" key={m.timeStamp}>{m.msg}</div>);
		});
	}

	let history;
	if (conversationHistory) {
		history = conversationHistory.map((msg) => {
			return (<MsgConversations
				msg={msg} key={msg.timeStamp}
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

				{allMessages ? (
					<span>
						<textarea id="textMessage" type="text"
							value={message}
							onChange={handleChangeMessage}
							placeholder="Skriv ditt meddelande här" />

						<button className="call" onClick={addMessageButton}>
							Skicka
						</button>
					</span>
				) : null}
			</main>
		</div>
	)
};

export default MsgView;