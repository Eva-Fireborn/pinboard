import React from 'react';

const RemoveAccount = ({changeRemoveAccountVisibility, isLoggedIn, logOff}) => {

    let removeAccount = () => {
        console.log('removed')
        fetch(`http://localhost:4000/removeUserByID/${isLoggedIn._id}`)
			.then(res => res.json())
			.then((result) => {
                    console.log(result) 
                    localStorage.removeItem('user');
                    logOff();
                    changeRemoveAccountVisibility();
                    window.location.reload(false);
                }
				, (error) => console.log(error)
			)
    }
    return (
        <div id="loginPopup">
            <div id="loginWindow">
            <button className="close" onClick={changeRemoveAccountVisibility}>X</button>
                <div id="removeUserText">
                    <p>Detta kommer permanent radera din information. Är du säker på att du vill ta bort ditt konto? </p>
                </div>
                <div>
                    <button id="removeUserButton" onClick={removeAccount}>Ja ta bort mitt konto</button>
                    <button onClick={changeRemoveAccountVisibility}>Avbryt</button>
                </div>
            </div>
            <div className="darkness" onClick={changeRemoveAccountVisibility}></div>
        </div>
        
    )
}
export default RemoveAccount;