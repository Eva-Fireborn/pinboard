import React from 'react';
//import logo from './../img/pinboard.png';

const CreateUserInputForm = ({activateCreateUser, userInformation, changeUserInformation, updateIsLoggedIn}) => {
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
        updateIsLoggedIn({
            name: res.body.res.name,
            address: res.body.res.address,
            email: res.body.res.email,
            imgUrl: res.body.res.imgUrl,
            memeberSince: res.body.res.memeberSince,
            phone: res.body.res.phone,
            postalcode: res.body.res.postalcode,
            rating: res.body.res.rating,
            totalOfRatings: res.body.res.totalOfRatings,
            _id: res.body.res._id,
            description: res.body.res.description
        })
        activateCreateUser();
        localStorage.setItem('user', JSON.stringify(res.body.res));
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