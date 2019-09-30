import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
	faCog,
	faSignOutAlt,
	faQuestionCircle,
	faIdCard,
} from '@fortawesome/free-solid-svg-icons';

const OwnersMenu = ({ SetEditProfile, logOff }) => {
	return (
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
				} }>
					<FontAwesomeIcon icon={faSignOutAlt} />
					Logga ut
				</Link>
			</li>
		</ul>
	);
};

export default OwnersMenu;