import React, { Component } from "react";
import openSocket from 'socket.io-client';
import MsgConversations from './MsgConversations';

const socket = openSocket('http://localhost:4000');




export default class MsgView extends Component {


	constructor(props) {
		super(props);

		this.state = {
			userId: this.props.isLoggedIn._id,
			conversationId: "",
			message: "",
			conversationHistory: null,
			selectedConversation: null
		};
	}

	componentDidMount() {
			fetch(`http://localhost:4000/ApiGetAllMsgForUser
				/${this.state.userId}`)
		.then(res => res.json())
		.then( (result) => {
			let parsedResult = JSON.stringify(result.body);
			let msg = [];
			JSON.parse(parsedResult).forEach(res => {
				msg.push(res)

			});
			this.setState({
				conversationHistory: msg
			});
		},
		(error) => {
			console.log(error)
		}
	)  // fetch

}

	async	postNewMsg(msg, id) {
		let obj = {
			id: id,
			messages: msg
		}
		const serverResponse = await fetch('http://localhost:4000/ApiUpdateMsg',
				{
					method: 'POST',
					body: JSON.stringify(obj, null),
					headers: {
							"Content-type": "application/json; charset=UTF-8"
					}
			});
			const res = await serverResponse.json();
			console.log('response: ', res.status);
	};

	handleChangeMessage = e => {
		this.setState({
			message: e.target.value
		})
	};

	addMessageButton = e => {
		let newMessages = this.state.selectedConversation.message;
		let obj = {
			msg: this.state.message,
			msgId: this.state.userId
		}
		newMessages.push(obj)
		this.postNewMsg(newMessages, this.state.selectedConversation._id)
		socket.emit('chat message', this.state.message)

		this.setState({
			message: ""
		})
	};

	socketOnMessage = () => {
		socket.on('chat message', data => {
			console.log('Client received chat message: ', data.message);
			//alert(JSON.stringify(data.message))
		});
	};

	//socketOnMessage();


	onClickGetConversations = (msg) => {
		this.setState({
			selectedConversation: msg
		})
	};

	render(){


		let allMessages;
		if(this.state.selectedConversation){
		allMessages = this.state.selectedConversation.message.map((m, index)	 => {
			let className;
			if(m.msgId === this.state.userId){
				className = "msgSelf";
				return (
					<div className={className} key={index} >
					{m.msg}
					</div>
				)
			}
			else{
				className = "msgOther";
				return(
					<div className={className} key={index} >
					{m.msg}
					</div>
				)
			};
		});
	}else{
		let	allMessages = null;
	}
	return (

				<div id="wrapper">
				<aside>
				{this.state.conversationHistory ?
					this.state.conversationHistory.map((msg, key) =>
						<MsgConversations
						onClickGetConversations={this.onClickGetConversations}
						ads={msg}
						key={key}
						/> )

				:
				 null}
					</aside>
					<main id="msg">
						{allMessages}
						<textarea id="textMessage" type="text"
									value={this.state.message}
									onChange={this.handleChangeMessage}
									placeholder="Skriv ditt meddelande här" />

						<button className="call"
										onClick={this.addMessageButton}>
							Skicka
						</button>
					</main>
				</div>
			)
	};
};
