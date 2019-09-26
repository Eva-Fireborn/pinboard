import React, { useState } from 'react';

const FirstMessageToAd = ({ adObject, isLoggedin }) => {
    let [messageInput, updateMessageInput ]= useState('');
    let [messageToUser, updateMessageToUser] = useState('');
    let [buttonDisabled, updateButtonDisabled] = useState(false);
    function prepare () {
        updateButtonDisabled(true);
        let messageToDb = {
            message: [{
                msg: messageInput,
                msgId: isLoggedin._id
            }],
            senderId: isLoggedin._id,
            senderName: isLoggedin.name,
            recieverId: adObject.userData[0]._id,
            recieverName: adObject.userData[0].name,
            adId: adObject._id,
            adHeader: adObject.header,
            timeStamp: new Date()
        }
        return sendMessageToDatabase(messageToDb)
    }
    async function sendMessageToDatabase (messageToDb) {
        if (isLoggedin._id){
            let parsed = JSON.stringify(messageToDb, null)
            const serverResponse = await fetch('http://localhost:4000/ApiPostNewMsg', {
                method: 'POST',
                body: parsed,
                headers: {
                    'Content-type':'application/json; charset=UTF-8'
                }
            });
            const res = await serverResponse.json();
            console.log('response : ', res)
            return notifyUser();
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
    return(
        <div>
            <p>Skriv ditt meddelande till annonsören</p>
            <textarea id="firstMessageTextarea" onChange={ (e) =>onTextAreaChange(e.target.value) }></textarea>
            <button disabled={buttonDisabled} onClick={prepare}>Skicka meddelande</button>
            <p>{messageToUser}</p>
        </div>
    )
}

export default FirstMessageToAd;