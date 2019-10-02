import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
	faMapMarkerAlt,
	// faComment,
} from '@fortawesome/free-solid-svg-icons';

const ProfileSideList = ({ reviewScroll, profileData, editProfile, isLoggedIn }) => {
	return (
		<ul>
			<li>
				<Link to="#">
					<FontAwesomeIcon icon={faMapMarkerAlt} />
					{profileData.city}
				</Link>
			</li>
			{/* <li>
				<Link to="#" onClick={reviewScroll}>
					<FontAwesomeIcon icon={faComment} />
					{profileData.totalOfRatings} Recensioner
				</Link>
			</li> */}
		</ul>
	);
}
export default ProfileSideList;