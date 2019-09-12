import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faEye,
  faMapMarkerAlt,
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
						<div>
							<FontAwesomeIcon icon={faMapMarkerAlt} /><span>Göteborg</span>
						</div>
            <div>Har funnits på Pinboard sedan 2012</div>
					</div>
					<div className="settingsProfile">
						<div>
						<FontAwesomeIcon icon={faCog} /><span>Inställningar</span>
						</div>
						<div>
							<FontAwesomeIcon icon={faEye} /><span>Antal besökare</span>
						</div>
					</div>

				</div>
				<div className="flex2">
					<div className="profileText">Lite om mig och så...</div>
          <p id="reviewp">Tycker andra om mig</p>
					<div className="profileRating">
						<div>Grym</div>
						<div>Nja <br  />
            najs
            </div>
						<div>Ooops</div>
					</div>
          <button id="logout">Logga ut</button>
				</div>
			</main>
		</div>

	)
};

export default ProfileView;
