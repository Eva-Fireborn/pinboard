import React, { Component } from "react";
import openSocket from 'socket.io-client';
import MsgConversations from './MsgConversations';
const socket = openSocket('http://localhost:4000');



export default class MsgView extends Component {

//userId & receiverId via props

	constructor(props) {
		super(props);

		this.state = {
			userId: this.props.isLoggedIn.user._id,
			message: "",
			recieverId: '5d8357516ba6fb424c221ca5',
			messageHistory: []
		};
	}

	componentDidMount() {

		fetch('http://localhost:4000/ApiGetAllMsg')
		//console.log('körs fetch')
		.then(res => res.json())
		.then( (result) => {
			let parsedResult = JSON.parse(result.body);
			let msg = [];
			parsedResult.forEach(res => {
				console.log('MsgView fetch: ', res)
				msg.push(res)

			});
			this.setState({
				messageHistory: msg
			});
		},
		(error) => {
			console.log(error)
		}
	)
/*
		socket.emit('user info', { email: 'kristina@hotmail.com', nickname: 'Tinna' });
		socket.on('chat message', data => {
			console.log('Client received chat message: ', data);
		})
*/
}

	async	postNewMsg(msg) {
		const serverResponse = await fetch('http://localhost:4000/ApiPostNewMsg',
				{
					method: 'POST',
					body: JSON.stringify(msg, null),
					headers: {
							"Content-type": "application/json; charset=UTF-8"
					}
			});
			const res = await serverResponse.json();
			console.log('response: ', res.status);
	};

	handleChangeMessage = e => {
		console.log('Körs handleChangeMessage?');
		this.setState({
			message: e.target.value
		})
	};

	addMessageButton = e => {
		console.log('Körs addMessageButton?');
		let messageObj = {
			message: this.state.message,
			senderId: this.state.userId,
			recieverId: this.state.recieverId,
			timeStamp: this.getNewTime(new Date()) };

		this.setState({
			messageHistory: [...this.state.messageHistory, messageObj]
		})
		this.postNewMsg(messageObj)

		socket.emit('chat message', messageObj)
		console.log('front end msg: ', messageObj);
		this.setState({
			message: ""
		})

	}


	getNewTime = (date) => {
	  return `${date.getHours()}: ${("0" + date.getMinutes()).slice(-2)} `
	}
	//todo if conversation is choosen show messages.
	//create component for conversations in aside.


	render(){

		const allMessages = this.state.messageHistory.map((m, index)	 => {
			let className;
			console.log('vad händer? ', m);
			if(this.state.userId === m.senderId){
				className = "msgSelf";
			}
			else{
				className = "msgOther";
			}
			return (
				<div className={className} key={index} >
				{m.message}
				{m.timeStamp}

				</div>
			)
		});
	return (
		<div id="wrapper">
			<MsgConversations messageHistory={this.state.messageHistory} />
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
	);
	};
};
