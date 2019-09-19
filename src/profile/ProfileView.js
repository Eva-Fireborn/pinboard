import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import OwnersMenu from "./OwnersMenu.js";
import SingleAdCard from "../ads/SingleAdCard.js";
import SingleReview from "./SingleReview.js";
import {
	faMapMarkerAlt,
	faComment,
	faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';

const ProfileView = ({ isLoggedIn }) => {
	const [owner, setOwner] = useState(false);
	/*const [profileData, setProfileData] = useState({
		name: 'Fredrika Lycke',
		about: 'Lite om mig och så...  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id mauris ac erat dapibus tempus sit amet bibendum nisi. Aliquam magna erat, iaculis sit amet laoreet a, viverra quis metus. Fusce ac ultricies felis, vel vulputate mauris. Quisque et suscipit nunc. Nullam in facilisis erat, ut posuere erat. Ut volutpat.',
		location: 'Göteborg',
		language: ['Svenska', 'Engelska'],
	});*/

	const reviewScroll = () => document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });

	if (isLoggedIn){
		return (
			<div id="wrapper">
				<aside className="profile">
					<img src={isLoggedIn.user.imgUrl} alt="profile img" />
					<section>
						<h1>{isLoggedIn.user.name}</h1>
						<h5>Medlem på Pinboard sedan {isLoggedIn.user.memberSince}.</h5>
	
						<ul>
							<li>
								<Link to="#">
									<FontAwesomeIcon icon={faMapMarkerAlt} />
									{isLoggedIn.user.city}
								</Link>
							</li>
							<li>
								<Link to="#" onClick={reviewScroll}>
									<FontAwesomeIcon icon={faComment} />
									{isLoggedIn.user.totalOfRatings} Recensioner
								</Link>
							</li>
						</ul>
					</section>
	
					<section>
						{owner ? <OwnersMenu /> : null}
	
						<button onClick={() => setOwner(!owner)}>
							Temp Flip Owner State
						</button>
					</section>
				</aside>
				<main className="profile">
					<h2>Om mig:</h2>
					<section>
						<p>
							{isLoggedIn.user.about}
						</p>
					</section>
	
					<section>
						<h2>Min tjänster:</h2>
						
					</section>
	
					<section id="reviews">
						<h2>Betyg:</h2>
						<ul>
							
						</ul>
					</section>
				</main>
			</div >
		);
	} else {
		return (
			<div id="wrapper">
				<p>Du är inte inloggad.</p>
			</div>
		)
	}

};

export default ProfileView;
/*<li>
							<FontAwesomeIcon icon={faChalkboardTeacher} />
							Språk: {profileData.language.map((s) => s + ' ')}
						</li>
						
						<SingleReview />
						
						<SingleAdCard />*/