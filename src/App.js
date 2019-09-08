import React from "react";
import Header from "./nav/Header.js";
import Footer from "./nav/Footer.js";
import Ads from "./ads/Main.js";
import AdsAside from "./ads/Aside.js";

const App = () => {
	return (
		<div id="App">
			<Header />
			<div id="wrapper">
				<aside>
					<AdsAside />
				</aside>
				<main>
					<Ads />
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default App;