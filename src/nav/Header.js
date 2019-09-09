import React, {useState} from "react";
import {Link} from "react-router-dom";

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
			<a id="logo" href="index.html">
				<img src={require('../img/tempLogo100.png')} alt="Pinboard" />
			</a>

			<nav>
				{navBar}
				
				{/* <a href="ads.html">Annonser</a>
				<a href="faq.html">Frågor och Svar</a>
				<a href="profile.html">
					<button>Login</button>
				</a>
				<a href="profile.html">
					<button class="call">Skapa Konto</button>
				</a> */}
				{/*
					when logged in you should have these menu (Max 5) options and sub menus:
						Annonser
						Skapa annons
						Mina Kurser
						Meddelanden
						Profil
							-> Help?
							-> Inställningar
							-> logga ut
				*/}
			</nav>
		</div>
	);
};

export default Header;
