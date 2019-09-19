import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
	faMapMarkerAlt,
	faComment,
	faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

const ProfileSideList = ({ reviewScroll, profileData, editProfile }) => {
	return (
		<ul>
			<li>
				<Link to="#">
					<FontAwesomeIcon icon={faMapMarkerAlt} />
					{profileData.location}
				</Link>
			</li>
			<li>
				<FontAwesomeIcon icon={faChalkboardTeacher} />
				Språk: {
					editProfile ?
						(<input type="text" placeholder={profileData.language.map((s) => s + ' ')} />)
						: profileData.language.map((s) => s + ' ')
				}
			</li>
			<li>
				<Link to="#" onClick={reviewScroll}>
					<FontAwesomeIcon icon={faComment} />
					3 Recensioner
				</Link>
			</li>
		</ul>
	);
}
export default ProfileSideList;