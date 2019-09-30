import React, { useState, useEffect } from "react";
import MsgConversations from './MsgConversations';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

const MsgView = ({ isLoggedIn }) => {
	const [message, setMessage] = useState('');
	const [conversationHistory, setConversationHistory] = useState(null);
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [receiverID, setReceiverID] = useState(null);

	useEffect(() => {
		if (isLoggedIn) {
			socket.emit('initHistory', isLoggedIn._id);
			socket.on('getHistory', history => setConversationHistory(history));
		}
	}, [isLoggedIn])

	const addMessageButton = e => {
		let msgObject = {
			message: message,
			senderID: isLoggedIn._id,
			receiverID: receiverID
		}

		setMessage("");
		socket.emit('sendMessage', msgObject);
		socket.on('getMsg', msg => setSelectedConversation([...selectedConversation, msg]));
	};

	const getConversations = msg => {
		setSelectedConversation(msg.message)
		if (msg.senderId === isLoggedIn._id)
			setReceiverID(msg.recieverId)
		else
			setReceiverID(msg.senderId)
	};
	const handleChangeMessage = e => setMessage(e.target.value);

	let allMessages;
	if (selectedConversation) {
		allMessages = selectedConversation.map((m, index) => {
			if (m.msgId === isLoggedIn._id)
				return (<div className="msgSelf" key={index}>{m.msg}</div>);
			else
				return (<div className="msgOther" key={index}>{m.msg}</div>);
		});
	}

	let history;
	if (conversationHistory) {
		history = conversationHistory.map((msg, key) => {
			return (<MsgConversations
				msg={msg} key={key}
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