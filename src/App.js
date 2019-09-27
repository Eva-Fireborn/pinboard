import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./nav/Header.js";
import Footer from "./nav/Footer.js";
import ContentRouting from './contentRouting';
import Login from './login/login';
import CreateUser from './login/createUser'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');


const App = () => {
	const [isLoggedIn, updateIsLoggedIn] = useState(null);
	let [loginVisibility, changeLoginVisibility] = useState(false);
	let [createUserVisibility, changeCreateUserVisibility] = useState(false);

	let activateLogin = () => changeLoginVisibility(!loginVisibility);
	let activateCreateUser = () => changeCreateUserVisibility(!createUserVisibility)
	let logOff = () => updateIsLoggedIn(null)

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			socket.emit('userID', user._id);
			return updateIsLoggedIn({
				_id: user._id,
				name: user.name
			})
		} else {
			return updateIsLoggedIn(null);
		}
	}, [])

	return (
		<div id="App">
			<Login visibility={loginVisibility} activateLogin={activateLogin} updateIsLoggedIn={updateIsLoggedIn} activateCreateUser={activateCreateUser} />
			<CreateUser visibility={createUserVisibility} updateIsLoggedIn={updateIsLoggedIn} activateCreateUser={activateCreateUser} />
			<Router>
				<Header isLoggedIn={isLoggedIn} loginVisibility={loginVisibility} changeLoginVisibility={changeLoginVisibility} />
				<ContentRouting isLoggedIn={isLoggedIn} logOff={logOff} />
				<Footer />
			</Router>
		</div>
	);
};

export default App;
