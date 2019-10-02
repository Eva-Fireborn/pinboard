import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
	faSignOutAlt,
	faQuestionCircle,
	faIdCard,
	faTrash
} from '@fortawesome/free-solid-svg-icons';
import RedMessage from "./RedMessage";

const OwnersMenu = ({ SetEditProfile, logOff, changeRemoveAccountVisibility, loggedIn }) => {
	const [messageSent, setMessageSent] = useState(false);
	// const [visible, setVisible] = useState(true);
	// // const useForceUpdate = () => useState()[1];
	// // const forceUpdate = useForceUpdate();

	// if (loggedIn === true) {
	// 	setVisible(true);
	// } 

	// console.log(loggedIn);
	// console.log(visible);
	return (
		<div className="ownersMenu">
		<ul>
			<li>
				<Link to="#" onClick={() => SetEditProfile(true)}>
					<FontAwesomeIcon icon={faIdCard} />
					Ändra profil
				</Link>
			</li>
			{/* <li>
				<Link to="#">
					<FontAwesomeIcon icon={faCog} />
					Ändra konto Inställningar
				</Link>
			</li> */}
			<li>
				<Link to="/frågorochsvar#konto">
					<FontAwesomeIcon icon={faQuestionCircle} />
					Hjälp
				</Link>
			</li>
			<li>
				<Link to="#" onClick={() => {
						logOff()
						localStorage.removeItem('user');
						// console.log('you logged out now!');
						// setVisible(false);
						setMessageSent(true);
						setTimeout(() => setMessageSent(false), 2000);
						window.location.reload(false);
						} 
					}>
					<FontAwesomeIcon icon={faSignOutAlt} />
					Logga ut
				</Link>
			</li>
			<li >
				<Link to="#" onClick={changeRemoveAccountVisibility} >
					<FontAwesomeIcon icon={faTrash} />
					Radera mitt konto
				</Link>
			</li>
		</ul>
		{messageSent ? <RedMessage /> : null}
		</div>
	);
};

export default OwnersMenu;