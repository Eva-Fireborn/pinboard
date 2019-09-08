import React from "react";
import Header from "./nav/Header.js";
import Footer from "./nav/Footer.js";
import AdsView from "./ads/AdsView.js";
import MsgView from "./msg/MsgView.js";

const App = () => {
	return (
		<div id="App">
			<Header />

			<MsgView />

			<Footer />
		</div>
	);
};

export default App;