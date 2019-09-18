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
	const [owner, setOwner] = useState(true);
	const [editProfile, SetEditProfile] = useState(false);
	const [profileData, setProfileData] = useState({
		name: 'Fredrika Lycke',
		about: 'Lite om mig och så...  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id mauris ac erat dapibus tempus sit amet bibendum nisi. Aliquam magna erat, iaculis sit amet laoreet a, viverra quis metus. Fusce ac ultricies felis, vel vulputate mauris. Quisque et suscipit nunc. Nullam in facilisis erat, ut posuere erat. Ut volutpat.',
		location: 'Göteborg',
		language: ['Svenska', 'Engelska'],
	});

	const reviewScroll = () => document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });

	return (
		<div id="wrapper">
			<aside className="profile">
				<img src={require('../img/tempProfile.jpg')} alt="profile img" />
				<section>
					<h1>{profileData.name}</h1>
					<h5>Medlem på Pinboard sedan 2012.</h5>

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
				</section>

				<section>
					{owner ?
						<OwnersMenu
							SetEditProfile={() => SetEditProfile(!editProfile)}
						/>
						: null
					}
					<button onClick={() => setOwner(!owner)}>
						Temp Flip Owner State
					</button>
				</section>
			</aside>
			<main className="profile">
				<h2>Om mig:</h2>
				<section>
					<p>
						{profileData.about}
					</p>
				</section>

				<section>
					<h2>Min tjänster:</h2>
					<SingleAdCard />
					<SingleAdCard />
				</section>

				<section id="reviews">
					<h2>Betyg:</h2>
					<ul>
						<SingleReview />
						<SingleReview />
						<SingleReview />
					</ul>
				</section>
			</main>
		</div >
	);
};

export default ProfileView;
