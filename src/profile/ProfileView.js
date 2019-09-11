import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCog
} from '@fortawesome/free-solid-svg-icons';

const ProfileView = () => {
	return (
		<div id="wrapper">
			<main>
				<div className="flex1">
					<div>
						<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
					</div>
					<div className="profileAbout">
						<div>Fredrika Lycke</div>
						<div className="rating">
							<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
						</div>
						<div>Har funnits på Pinboard sedan 2012</div>
						<div>
							<FontAwesomeIcon icon={faCog} /><span>Göteborg</span>
						</div>
					</div>
					<div className="settingsProfile">
						<div>
							<span>hjul</span><span>Inställningar</span>
						</div>
						<div>
							<span>öga</span><span>Antal besökare</span>
						</div>
					</div>

				</div>
				<div className="flex2">
					<div className="profileText">blabla</div>
					<div className="profileRating">
						<div>Grym</div><br />
						<div>Nja</div><br />
						<div>Ooops</div><br />
					</div>
				</div>
			</main>
		</div>

	)
};

export default ProfileView;
