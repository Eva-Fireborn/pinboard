import React, { useState, useEffect } from "react";
import MsgConversations from './MsgConversations';
import { chat, sendMsg, initUser, getHistory } from "../socket/api";

const MsgView = ({ isLoggedIn }) => {
	const [message, setMessage] = useState([])
	const [history, setHistory] = useState();
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [receiverId, setReceiverId] = useState(null);
	const [selectedConversationId, setSelectedConversationId] = useState(null);

	useEffect(() => {
		if (isLoggedIn) {
			// this shit make everything loop... one extra time for each render...
			initUser(isLoggedIn._id);
			getHistory(dbHistory => {
				setHistory(dbHistory)
			})
		}
	}, [isLoggedIn])

	useEffect(() => {
		chat(msg => {
			console.log(msg);
		});
	}, [message])

	const addMessageButton = e => {
		let msgObject = {
			newMessage: message,
			senderId: isLoggedIn._id,
			receiverId: receiverId,
			objId: selectedConversationId
		}
		setMessage("");
		sendMsg(msgObject);
	};

	const showConversations = msg => {
		setSelectedConversation(msg.message)
		setSelectedConversationId(msg._id)
		if (msg.senderId === isLoggedIn._id)
			setReceiverId(msg.recieverId)
		else
			setReceiverId(msg.senderId)
	};

	let domAllMessages;
	if (selectedConversation && selectedConversation.length > 0) {
		domAllMessages = selectedConversation.map((m) => {
			if (m.senderId === isLoggedIn._id)
				return (<div className="msgSelf" key={m.timeStamp}>{m.msg}</div>);
			else
				return (<div className="msgOther" key={m.timeStamp}>{m.msg}</div>);
		});
	}

	let domHistory;
	if (history) {
		domHistory = history.map((msg) => {
			return (<MsgConversations
				msg={msg} key={msg.timeStamp}
				showConversations={showConversations}
			/>)
		})
	}

	return (
		<div id="wrapper">
			<main>
				<aside>
					{domHistory}
				</aside>
				{domAllMessages}
				{domAllMessages ? (
					<span>
						<textarea id="textMessage" type="text"
							value={message}
							onChange={e => setMessage(e.target.value)}
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