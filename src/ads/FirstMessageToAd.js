import React, {useState} from 'react';

const FirstMessageToAd = ({ userInfo, isLoggedin }) => {
    //let [message, setMessage] = useState('');
    let messageInput = '';
    async function sendMessageToDatabase () {
        if (isLoggedin._id){
            let message = {
                message: messageInput,
                senderId: this.isLoggedin._id,
                recieverId: userInfo.userId,
                timeStamp: new Date()
            }
            const serverResponse = await fetch('http://localhost:4000/ApiPostNewMsg',
            {
                method: 'POST',
                body: JSON.stringify(message, null),
                headers: {
                    'Content-type':'application/json, charset=UTF-8'
                }
            });
            const res = await serverResponse.json();
            console.log('response : ', res)
        }
        
    }
    const onTextAreaChange = (value) => {
        messageInput = value;
        console.log('isLoggedIn firstMessage: ', isLoggedin)
    }
    return(
        <div>
            <p>Skriv ditt meddelande till annonsören</p>
            <textarea id="firstMessageTextarea" onChange={ (e) =>onTextAreaChange(e.target.value) }></textarea>
            <button onClick={sendMessageToDatabase}>Skicka meddelande</button>
        </div>
    )
}

export default FirstMessageToAd;