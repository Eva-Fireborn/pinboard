import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Login from './../login/login';
import {
	faChalkboardTeacher,
	faPlusSquare,
	faQuestionCircle,
	faSignInAlt,
	faUser,
	faEnvelope
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
			icon: faChalkboardTeacher,
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
			icon: faUser
		},
		{
			name: "Meddelanden",
			to: "/meddelanden",
			icon: faEnvelope
		}
	]);

	const navBar = links.map((link, index) => (
		<Link to={link.to} key={index} >
			<FontAwesomeIcon icon={link.icon} />
			{link.name}
		</Link>
	));

	const loginMenu = { name: "Logga in", icon: faSignInAlt }

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
						<Link to="#" onClick={activateLogin}>
							<FontAwesomeIcon icon={loginMenu.icon} />
							{loginMenu.name}
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Header;
