import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faChalkboardTeacher,
	faPlusSquare,
	faQuestionCircle,
	faSignInAlt,
	faUser,
	faEnvelope
} from '@fortawesome/free-solid-svg-icons'

const Header = ({ isLoggedIn, loginVisibility, changeLoginVisibility }) => {

	let activateLogin = () => changeLoginVisibility(!loginVisibility);

	return (
		<div id="header">
			<div id="fixedMenu">
				<div id="logo">
					<Link to="/">
						<img src={require('../img/pinboardGul.png')} alt="Pinboard" />
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
						Hjälp
						</Link>
					{isLoggedIn ? (
						<Link to="/meddelanden">
							<FontAwesomeIcon icon={faEnvelope} />
							Meddelanden
						</Link>
					) : null}
					{isLoggedIn ?
						(
							<Link to={'/profil/' + isLoggedIn._id}>
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
	);
};

export default Header;
