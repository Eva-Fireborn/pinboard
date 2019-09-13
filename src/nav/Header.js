import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Login from './../login/login';
import {
	faChalkboardTeacher,
	faPlusSquare,
	faQuestionCircle,
	faSignInAlt
} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
	let [visibility, changeVisibility] = useState(false);

	let activateLogin = () => {
		let current = visibility;
		return changeVisibility(!current);
	}
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
			name: "Profil",
			to: "/profil",
			icon: faSignInAlt
		},
		{
			name: "Meddelanden",
			to: "/meddelanden",
			icon: faSignInAlt
		}
	]);

	const navBar = links.map((link, index) => (
		<Link to={link.to} key={index} >
		<FontAwesomeIcon icon={link.icon} />
		{link.name}
	</Link>	
	));
	const loginMenu = {name: "Logga in", icon: faSignInAlt}

	return (
		<div id="loginWrapper">
			<Login visibility={visibility} activateLogin={activateLogin} />
		<div id="header">
			<div id="fixedMenu">
				<div id="logo">
					<Link to="/">
						<img src={require('../img/pinboard.png')} alt="Pinboard" />
					</Link>
				</div>
				<nav>
					{navBar}
					<div id="loginNavbar" onClick={activateLogin}>
					<FontAwesomeIcon icon={loginMenu.icon} />
					{loginMenu.name}
					</div>
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
		</div>
	);
};

export default Header;
