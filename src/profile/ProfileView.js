import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEye,
	faMapMarkerAlt,
	faCog
} from '@fortawesome/free-solid-svg-icons';

const ProfileView = () => {
	const [owner, setOwner] = useState(true);

	return (
		<div id="wrapper">
			<main id="profile">
				<div className="flex1">
					<div className="profileAbout">
						<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />

						<h1>Fredrika Lycke</h1>
						<div>
							<FontAwesomeIcon icon={faMapMarkerAlt} /> Göteborg
						</div>
						<div>
							Har funnits på Pinboard sedan 2012
						</div>
					</div>

					<div className="settingsProfile">
						<div>
							<FontAwesomeIcon icon={faCog} /> Inställningar
						</div>
						<div>
							<FontAwesomeIcon icon={faEye} /> Antal besökare
						</div>
					</div>
				</div>

				<div className="flex2">

					<h3>Om mig:</h3>
					<div className="profileText">
						Lite om mig och så...  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id mauris ac erat dapibus tempus sit amet bibendum nisi. Aliquam magna erat, iaculis sit amet laoreet a, viverra quis metus. Fusce ac ultricies felis, vel vulputate mauris. Quisque et suscipit nunc. Nullam in facilisis erat, ut posuere erat. Ut volutpat.
					</div>

					<h3>Betyg: <span>☆☆☆☆☆</span></h3>
					<ul className="profileRating">
						<li>Grym <span>☆☆☆☆☆</span></li>
						<li>Nja <span>☆☆☆☆☆</span></li>
						<li>Ooops <span>☆☆☆☆☆</span></li>
					</ul>
				</div>
			</main>
		</div>

	)
};

export default ProfileView;
