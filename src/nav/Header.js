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
	const [isLoggedIn, changeIsLoggedIn] = useState(false);

	let activateLogin = () => {
		let current = visibility;
		return changeVisibility(!current);
	}

	return (
		<div id="loginWrapper">
			<Login visibility={visibility} activateLogin={activateLogin} changeIsLoggedIn={changeIsLoggedIn} />
			<div id="header">
				<div id="fixedMenu">
					<div id="logo">
						<Link to="/">
							<img src={require('../img/pinboard.png')} alt="Pinboard" />
						</Link>
					</div>
					<nav>
						<Link to="/annonser">
							<FontAwesomeIcon icon={faChalkboardTeacher} />
							Tjänster
						</Link>
						<Link to="/skapaannons">
							<FontAwesomeIcon icon={faPlusSquare} />
							Skapa annons
						</Link>
						<Link to="/frågorochsvar">
							<FontAwesomeIcon icon={faQuestionCircle} />
							Frågor och svar
						</Link>
						{isLoggedIn ? (
							<Link to="/meddelanden">
								<FontAwesomeIcon icon={faEnvelope} />
								Meddelanden
						</Link>) : null}
						{isLoggedIn ?
							(
								<Link to="/profil">
									<FontAwesomeIcon icon={faUser} />
									Profil
								</Link>
							) : (
								<Link to="#" onClick={activateLogin}>
									<FontAwesomeIcon icon={faSignInAlt} />
									Logga in
								</Link>
							)
						}
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Header;
