import React from "react";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import logo from './../img/pinboard.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const CreateUserVerification = ({ activateCreateUser, responseGoogle, responseFacebook }) => {

return (
    <div id="createUserWindow">
        <button className="close" onClick={activateCreateUser}>X</button>
        <img src={logo} id="loginLogo" alt="logotyp" />
        <div>
            <p>För att skapa ett konto så behöver du verifiera <br/> dig med 
            Google eller Facebook.</p> 
            <p>Klicka knapparna nedan för att verifiera dig.</p>
        </div>
        <GoogleLogin 
            clientId="285513444438-31ksr33o72j9p5rsvg21jpftqmre5s6f.apps.googleusercontent.com"
            buttonText="Logga in med Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle} />
        <FacebookLogin 
            appId="377634436266070"
            autoLoad={false}
            textButton="Logga in med Facebook"
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="facebookButton"
            icon={<FontAwesomeIcon icon={faFacebookF} className="icon" />} />
    </div>
)
}
export default CreateUserVerification;