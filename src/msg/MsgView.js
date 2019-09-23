import React, { Component } from "react";
import openSocket from 'socket.io-client';

//const socket = openSocket('http://localhost:4000');

const mh = [
	{
		_id: '1337',
		message: 'Hej',
		senderId: 1,
		receiverId: 2,
		timestamp: null
	},
	{
		_id: '1338',
		message: 'tjena',
		senderId: 2,
		receiverId: 1,
		timestamp: null
	},
	{
		_id: '1339',
		message: 'hejdå',
		senderId: 1,
		receiverId: 2,
		timestamp: null
	},

]

export default class MsgView extends Component {

//userId & receiverId via props

	constructor(props) {
		super(props);

		this.state = {
			userId: 1, //från db
			message: "", //input från anv.
			recieverId: 2, //annons id från db
			messageHistory: [...mh]
		};
	}

	// componentDidMount() {
	// 	socket.emit('user info', { email: 'julian@gmail.com', nickname: 'Jules' });
	// 	socket.on('chat message', data => {
	// 		console.log('Client received chat message: ', data);

	// 	})
	// }

	handleChangeMessage = e => {
		console.log('Körs handleChangeMessage?');
		this.setState({
			message: e.target.value
		})
	}

	addMessageButton = e => {
		console.log('Körs addMessageButton?');
		let messageObj = { message:this.state.message, senderId: this.state.userId, recieverId: this.state.recieverId, timeStamp: this.getNewTime(new Date()) };
		this.setState({
			messageHistory: [...this.state.messageHistory, messageObj]
		})
		// socket.emit('chat message', messageObj);
		// this.setState({
		// 	message: ""
		// })
	}


	getNewTime = (date) => {
	  return `${date.getHours()}: ${("0" + date.getMinutes()).slice(-2)} `
	}

	render(){

		const allMessages = this.state.messageHistory.map(m => {
			let className;
			console.log('vad händer? ', m);
			if(this.state.userId === m.senderId){
				className = "msgSelf";
			}
			else{
				className = "msgOther";
			}
			return (
				<div className={className} key={m._id} >
				{m.message}
				{m.timeStamp}
				{m.senderId}
				</div>
			)
		});
	return (
		<div id="wrapper">
			<aside>
				<div className="adUserName selected">
					<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
					<div>
						Magical unicorn user
					</div>
					<div className="arrow"></div>
				</div>
				<div className="adUserName">
					<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
					<div>
						Unicorn lover
					</div>
				</div>
				<div className="adUserName">
					<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
					<div>
						Horse
					</div>
				</div>
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
	);

	};
};
