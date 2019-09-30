import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
	faCog,
	faSignOutAlt,
	faQuestionCircle,
	faIdCard,
	faTrash
} from '@fortawesome/free-solid-svg-icons';

const OwnersMenu = ({ SetEditProfile, logOff, changeRemoveAccountVisibility }) => {
	return (
		<ul>
			<li>
				<Link to="#" onClick={() => SetEditProfile()}>
					<FontAwesomeIcon icon={faIdCard} />
					Ändra publik profil
				</Link>
			</li>
			<li>
				<Link to="#">
					<FontAwesomeIcon icon={faCog} />
					Ändra konto Inställningar
				</Link>
			</li>
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
				} }>
					<FontAwesomeIcon icon={faSignOutAlt} />
					Logga ut
				</Link>
			</li>
			<li onClick={changeRemoveAccountVisibility}>
				<FontAwesomeIcon icon={faTrash} />
				Radera mitt konto
			</li>
		</ul>
	);
};

export default OwnersMenu;