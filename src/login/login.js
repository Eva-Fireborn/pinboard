import React from 'react';
import logo from './../img/pinboard.png';
import GoogleLogin from 'react-google-login';

const Login = ({visibility, activateLogin}) => {
    if (visibility) {
        return (
        <div id="loginPopup">
            <div id="loginWindow">
                <button id="removeLoginPopupButton" onClick={activateLogin}>X</button>
                <img src={logo} id="loginLogo" alt="logotyp" />
                <input id="usernameInput" type="text" placeholder="E-mail"/>
                <input id="passwordInput" type="password" placeholder="Lösenord"/>
                <button id="loginWithEmailButton">Logga in</button>
                <div id="loginWithGoogleButton">
                <GoogleLogin
                    clientId="285513444438-31ksr33o72j9p5rsvg21jpftqmre5s6f.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                    buttonText="Logga in med Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle} />
                </div>
            </div>
        </div>)
    } else {
        return null;
    }
}
const responseGoogle = (response) => {
    console.log(response);
    let info = response.profileObj;
    console.log('ID: ' + info.googleId); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + info.name);
  console.log('Image URL: ' + info.imageUrl);
  console.log('Email: ' + info.email); // This is null if the 'email' scope is not present.
  }

//clientID: 285513444438-31ksr33o72j9p5rsvg21jpftqmre5s6f.apps.googleusercontent.com
//client Secret: GP5K1P4neN4lu5y48Is_FzYQ

export default Login;