import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import Header from "./nav/Header.js";
import Footer from "./nav/Footer.js";
// Import of pages:
// import PinboardView from "./pinboard/PinboardView.js"; 
// import AdsView from "./ads/AdsView.js";
//import MsgView from "./msg/MsgView.js";
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