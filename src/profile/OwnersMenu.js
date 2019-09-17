import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
	faCog,
	faSignOutAlt,
	faQuestionCircle,
	faIdCard,
} from '@fortawesome/free-solid-svg-icons';

const OwnersMenu = () => {
	return (
		<ul>
			<li>
				<Link to="#">
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
				<Link to="#">
					<FontAwesomeIcon icon={faQuestionCircle} />
					Hjälp
				</Link>
			</li>
			<li>
				<Link to="#">
					<FontAwesomeIcon icon={faSignOutAlt} />
					Logga ut
				</Link>
			</li>
		</ul>
	);
};

export default OwnersMenu;