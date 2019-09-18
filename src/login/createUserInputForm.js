import React from 'react';
//import logo from './../img/pinboard.png';

const CreateUserInputForm = ({activateCreateUser, userInformation, changeUserInformation}) => {
    const updateField = e => {
        changeUserInformation({
            ...userInformation,
          [e.target.name]: e.target.value
        });
      };
      
      async function connectNewUser () {
        const serverResponse = await fetch('http://localhost:4000/ApiLogInNewUser', {
            method: 'POST',
            body: JSON.stringify(userInformation),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const res = await serverResponse.json();
        console.log('response: ', res.status)
    }
    return (
        <div id="createUserWindow">
            <button className="close" onClick={activateCreateUser}>X</button>
            <p>Adress</p>
            <input type='text' name="address" onChange={updateField} />
            <p>Postnummer</p>
            <input type='text' name="postalcode" onChange={updateField} />
            <p>Stad</p>
            <input type='text' name="city" onChange={updateField} />
            <p>Telefon</p>
            <input type='text' name="phone" onChange={updateField} />
            <p>Beskrivning om dig</p>
            <textarea rows="3" column="2" type='text' name="description" onChange={updateField} />
            <button onClick={connectNewUser}>Skapa konto</button>
        </div>
    )
    
}
export default CreateUserInputForm;