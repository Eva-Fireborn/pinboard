import React, { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./nav/Header.js";
import Footer from "./nav/Footer.js";
import ContentRouting from './contentRouting';
import Login from './login/login';


const App = () => {
	const [visibility, changeVisibility] = useState(false);
	const [isLoggedIn, updateIsLoggedIn] = useState(false);

	const activateLogin = () => changeVisibility(!visibility);

	return (
		<div id="App">
			<Login visibility={visibility} activateLogin={activateLogin} updateIsLoggedIn={updateIsLoggedIn} />
			<Router>
				<Header isLoggedIn={isLoggedIn} activateLogin={activateLogin} />
				<ContentRouting />
				<Footer />
			</Router>
		</div>
	);
};

export default App;
