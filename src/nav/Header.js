import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
	const [links] = useState([
		{name: "Annonser", to: "/annonser"},
		{name: "Skapa annons", to: "/skapaannons"},
        {name: "Frågor och svar", to: "/frågorochsvar"},
		{name: "Logga in", to: "/loggain"},
		{name: "Skapa konto", to: "/skapakonto"},
	]);

	const navBar = links.map((link, index) => (
		<span key={index} >
			<Link to={link.to} > {link.name} </Link>
		</span>
	));

	return (
		<div id="header">
			<div id="fixedMenu">
				<span>
					<Link to={"/home"} id="logo"> <img src={require('../img/tempLogo100.png')} alt="Pinboard" /></Link>
				</span>
				<nav>
					{navBar}
				</nav>
			</div>
		</div>
	);
};

export default Header;
