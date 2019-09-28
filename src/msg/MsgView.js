import React, { Component } from "react";
import MsgConversations from './MsgConversations';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

export default class MsgView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: "",
			conversationHistory: null,
			selectedConversation: null
		};
	}

	componentDidMount() {
		// socket.on('getHistory', this.props.isLoggedIn._id)
	}

	addMessageButton = e => {
		let msgObject = {
			msg: this.state.message,
			senderID: this.props.isLoggedIn._id,
			ReceiverID: this.state.ReceiverID
		}

		this.state.selectedConversation.push(msgObject);
		socket.emit('sendMessage', msgObject);

		this.setState({ message: "" })
	};

	onClickGetConversations = (msg) => this.setState({ selectedConversation: msg });
	handleChangeMessage = e => this.setState({ message: e.target.value });

	render() {
		let allMessages;
		if (this.state.selectedConversation) {
			allMessages = this.state.selectedConversation.message.map((m, index) => {
				if (m.msgId === this.state.userId)
					return (<div className="msgSelf" key={index}>{m.msg}</div>);
				else
					return (<div className="msgOther" key={index}>{m.msg}</div>);
			});
		}

		return (
			<div id="wrapper">
				<aside>
					{
						this.state.conversationHistory ?
							this.state.conversationHistory.map((msg, key) =>
								<MsgConversations
									onClickGetConversations={this.onClickGetConversations}
									ads={msg}
									key={key}
								/>
							) : null
					}
				</aside>

				<main id="msg">
					{allMessages}
					<textarea id="textMessage" type="text"
						value={this.state.message}
						onChange={this.handleChangeMessage}
						placeholder="Skriv ditt meddelande här" />

					<button className="call" onClick={this.addMessageButton}>
						Skicka
					</button>
				</main>
			</div>
		)
	};
};
