import React, { useState } from 'react';

const FirstMessageToAd = ({ adObject, isLoggedin }) => {
	const [messageInput, updateMessageInput] = useState('');
	const [messageToUser, updateMessageToUser] = useState('');
	const [buttonDisabled, updateButtonDisabled] = useState(false);

	function prepare() {
		updateButtonDisabled(true);
		if (isLoggedin) {
			let messageToDb = {
				message: [{
					msg: messageInput,
					senderId: isLoggedin._id
				}],
				senderId: isLoggedin._id,
				senderName: isLoggedin.name,
				recieverId: adObject.userData[0]._id,
				recieverName: adObject.userData[0].name,
				adId: adObject._id,
				adHeader: adObject.header
			}
			return sendMessageToDatabase(messageToDb)
		} else {
			updateMessageToUser('Du måste vara inloggad för att kunna skicka ett meddelande.');
			updateButtonDisabled(false);
		}
	}
	async function sendMessageToDatabase(messageToDb) {
		if (isLoggedin._id && isLoggedin.name) {
			let parsed = JSON.stringify(messageToDb, null)
			const serverResponse = await fetch('http://localhost:4000/ApiPostNewMsg', {
				method: 'POST',
				body: parsed,
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			});
			const res = await serverResponse.json();
			if (res.body === null) {
				updateMessageToUser('Du har redan skickat ett meddelande till denna annonsen, konversationen finns i dina meddelanden.');
			} else {
				return notifyUser();
			}

		}
		else {
			updateMessageToUser('Något verkar ha gått fel, försök igen om en stund.');
			updateButtonDisabled(false);
		}
	}
	const notifyUser = () => {
		updateMessageToUser('Ditt meddelande har skickats!');
		updateMessageInput('');
		updateButtonDisabled(false);
	}
	const onTextAreaChange = (value) => {
		updateMessageInput(value);
	}
	return (
		<div>
			<p>Skriv ditt meddelande till annonsören</p>
			<textarea id="firstMessageTextarea" onChange={(e) => onTextAreaChange(e.target.value)}></textarea>
			<button disabled={buttonDisabled} onClick={prepare}>Skicka meddelande</button>
			<p>{messageToUser}</p>
		</div>
	)
}

export default FirstMessageToAd;