import React from 'react';

const FirstMessageToAd = ({ adObject, isLoggedin }) => {
    //let [message, setMessage] = useState('');
    let messageInput = '';
    function prepare () {
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
            console.log('messageToDb :' , messageToDb)
            let parsed = JSON.stringify(messageToDb, null)
            console.log('parsed: ', parsed)
            const serverResponse = await fetch('http://localhost:4000/ApiPostNewMsg', {
                method: 'POST',
                body: parsed,
                headers: {
                    'Content-type':'application/json; charset=UTF-8'
                }
            });
            const res = await serverResponse.json();
            console.log('response : ', res)
        }
    }
    const onTextAreaChange = (value) => {
        messageInput = value;
    }
    return(
        <div>
            <p>Skriv ditt meddelande till annonsören</p>
            <textarea id="firstMessageTextarea" onChange={ (e) =>onTextAreaChange(e.target.value) }></textarea>
            <button onClick={prepare}>Skicka meddelande</button>
        </div>
    )
}

export default FirstMessageToAd;