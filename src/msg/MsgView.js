import React, { useState, useEffect } from "react";
import MsgConversations from './MsgConversations';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

const MsgView = ({ isLoggedIn }) => {
	const [message, setMessage] = useState('');
	const [allUserHistory, setAllUserHistory] = useState(null);
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [receiverId, setReceiverId] = useState(null);
	const [selectedConversationId, setSelectedConversationId] = useState(null);

	useEffect(() => {
		if (isLoggedIn) {
			socket.emit('initHistory', isLoggedIn._id);
			socket.on('getHistory', history => setAllUserHistory(history));
		}
		socket.on('message', msg => {
			console.log(msg);
			//setSelectedConversation(...selectedConversation, msg)
		});
	}, [isLoggedIn])


	const addMessageButton = e => {
		let msgObject = {
			newMessage: message,
			senderId: isLoggedIn._id,
			receiverId: receiverId,
			objId: selectedConversationId
			//objId: selectedConversation._id
		}


		setMessage("");
		socket.emit('message', msgObject);
	};

	const getConversations = msg => {
		setSelectedConversation(msg.message)
		setSelectedConversationId(msg._id)
		if (msg.senderId === isLoggedIn._id)
			setReceiverId(msg.recieverId)
		else
			setReceiverId(msg.senderId)
	};
	const handleChangeMessage = e => setMessage(e.target.value);

	let allMessages;
	if (selectedConversation && selectedConversation.length > 0) {
		allMessages = selectedConversation.map((m) => {
			if (m.senderId === isLoggedIn._id)
				return (<div className="msgSelf" key={m.timeStamp}>{m.msg}</div>);
			else
				return (<div className="msgOther" key={m.timeStamp}>{m.msg}</div>);
		});
	}
	let history;
	if (allUserHistory) {
		history = allUserHistory.map((msg) => {
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