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
			// this shit make everything loop... one extra time for each render... or something
			initUser(isLoggedIn._id);
			getHistory(dbHistory => {
				setHistory(dbHistory)
			})
		}
	}, [isLoggedIn])

	useEffect(() => {
		chat(msg => {
			console.log(msg)
			if (selectedConversation) {
				setSelectedConversation([...selectedConversation, msg])
			}

			/*
				shit keep geting rerender or something so selectedConversation so times is null and sometime not
			*/
			// setSelectedConversation(msg]); // < --this overwrite old msg but sort of work..
			// setSelectedConversation([...selectedConversation, msg]); // < --this breaks react
			/*
			let newArray = selectedConversation; // this is all fine and the array is there..
			newArray.push(msg) // but when I use push react fucking breaks again..
			*/
		});
	}, [selectedConversation])

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
		if (msg._id !== selectedConversationId) {
			setSelectedConversation(msg.message)
			setSelectedConversationId(msg._id)
			if (msg.senderId === isLoggedIn._id)
				setReceiverId(msg.receiverId)
			else
				setReceiverId(msg.senderId)
		}
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
			<aside>
				{domHistory}
			</aside>
			<main>
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