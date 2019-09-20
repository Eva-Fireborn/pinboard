import React from 'react';
import logo from './../img/pinboard.png';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const Login = ({ visibility, activateLogin, updateIsLoggedIn, activateCreateUser }) => {
	let switchWindow = () => {
		activateLogin();
		activateCreateUser();
	}
	if (visibility) {
		return (
			<div id="loginPopup">
				<div id="loginWindow">
					<button className="close" onClick={activateLogin}>X</button>

					<img src={logo} id="loginLogo" alt="logotyp" />
					<div>
						<p id="createNewAccountPLInk" onClick={switchWindow}>Har du inte ett konto? <br/><b>Klicka här och skapa ett.</b></p>
					</div>
					<GoogleLogin
						clientId="285513444438-31ksr33o72j9p5rsvg21jpftqmre5s6f.apps.googleusercontent.com"
						buttonText="Logga in med Google"
						onSuccess={responseGoogle}
						onFailure={responseGoogle} />
					<FacebookLogin
						appId="377634436266070"
						autoLoad={false}
						fields="name,email,picture"
						callback={responseFacebook} />
				</div>
				<div className="darkness" onClick={activateLogin}></div>
			</div>)
	} else {
		return null;
	}


	async function responseGoogle(response) {
		if (response.error) {
			console.log('oh, nooo..');
		} else {
			let info = response.profileObj;
			let body = {
				name: info.name,
				email: info.email
			}
			const serverResponse = await fetch('http://localhost:4000/ApiLogInUser', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			const res = await serverResponse.json();
			updateIsLoggedIn({
				user: res.body.res
			})
			activateLogin()
		}
	}

	async function responseFacebook (response) {
		if (response.error) {
			console.log('oh, nooo..');
		} else {
			let body = {
				name: response.name,
				email: response.email
			}
			const serverResponse = await fetch('http://localhost:4000/ApiLogInUser', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			});
			const res = await serverResponse.json();
			updateIsLoggedIn({
				user: res.body.res
			})
			activateLogin()
		}
	}

}

//clientID google: 285513444438-31ksr33o72j9p5rsvg21jpftqmre5s6f.apps.googleusercontent.com
//client Secret google: GP5K1P4neN4lu5y48Is_FzYQ

//<input id="usernameInput" type="text" placeholder="E-mail" />
//<input id="passwordInput" type="password" placeholder="Lösenord" />
//<button id="loginWithEmailButton">Logga in</button>

export default Login;