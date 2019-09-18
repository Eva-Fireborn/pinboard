import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
<<<<<<< HEAD
import Login from './../login/login';
import CreateUser from '../login/createUser';
=======
>>>>>>> 64bfc9ff2a559acebcfd368d0e1cfa61ececceed
import {
	faChalkboardTeacher,
	faPlusSquare,
	faQuestionCircle,
	faSignInAlt,
	faUser,
	faEnvelope
} from '@fortawesome/free-solid-svg-icons'

<<<<<<< HEAD
const Header = () => {
	let [loginVisibility, changeLoginVisibility] = useState(false);
	let [createUserVisibility, changeCreateUserVisibility] = useState(false);
	const [isLoggedIn, updateIsLoggedIn] = useState(false);

	let activateLogin = () => changeLoginVisibility(!loginVisibility);
	let activateCreateUser = () => changeCreateUserVisibility(!createUserVisibility)

	return (
		<div id="headerWrapper">
			<Login visibility={loginVisibility} activateLogin={activateLogin} updateIsLoggedIn={updateIsLoggedIn} activateCreateUser={activateCreateUser} />
			<CreateUser visibility={createUserVisibility} updateIsLoggedIn={updateIsLoggedIn} activateCreateUser={activateCreateUser}/>
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
=======
const Header = ({ isLoggedIn, activateLogin }) => {
	return (
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
>>>>>>> 64bfc9ff2a559acebcfd368d0e1cfa61ececceed
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
	);
};

export default Header;
