import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./nav/Header.js";
import Footer from "./nav/Footer.js";
import ContentRouting from './contentRouting';

const App = () => {
	return (
		<div id="App">
			<Router>
				<Header />
				<ContentRouting></ContentRouting>
				<Footer />
			</Router>
		</div>
	);
};

export default App;