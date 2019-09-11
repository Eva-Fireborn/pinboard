import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChalkboardTeacher,
	faPlusSquare,
	faQuestionCircle,
	faSignInAlt
} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
	const [links] = useState([
		{
			name: "Tjänster",
			to: "/annonser",
			icon: faChalkboardTeacher
		},
		{
			name: "Skapa annons",
			to: "/skapaannons",
			icon: faPlusSquare
		},
		{
			name: "Frågor och svar",
			to: "/frågorochsvar",
			icon: faQuestionCircle
		},
		{
			name: "Logga in",
			to: "/loggain",
			icon: faSignInAlt
		},
		{
			name: "Profil",
			to: "/profil",
			icon: faSignInAlt
		}
	]);

	const navBar = links.map((link, index) => (
		<Link to={link.to} key={index} >
			<FontAwesomeIcon icon={link.icon} />
			{link.name}
		</Link>
	));

	return (
		<div id="header">
			<div id="fixedMenu">
				<div id="logo">
					<Link to="/">
						<img src={require('../img/pinboard.png')} alt="Pinboard" />
					</Link>
				</div>
				<nav>
					{navBar}
					<Link to="/skapakonto">
						<button className="call">
							Skapa konto
						</button>
					</Link>

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
		</div>
	);
};

export default Header;
