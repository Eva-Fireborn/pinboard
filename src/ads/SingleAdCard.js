import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
	faMapMarkerAlt,
	faStar
	// , faPaw, faPalette, faMusic, faSeedling, faRoute, faChalkboardTeacher, faFolderPlus, faHome
} from '@fortawesome/free-solid-svg-icons';
import FirstMessageToAd from './FirstMessageToAd';

const SingleAdCard = ({ adObject, isLoggedIn }) => {
	const [readAll, setReadAll] = useState(false);
	let [messageToUserVisibility, updateMessageToUserVisibility] = useState(false);
	const fullText = adObject.description;
	const shortText = fullText.split(' ').splice(0, 25).join(' ');


	return (
		<li className="adCard">
			<div>
				<img src={require(`../img/adsImg/${adObject.category}.jpg`)} alt="ads img" />
				<button className="price call" onClick={()=> updateMessageToUserVisibility(!messageToUserVisibility)}>
					Svara på annonsen
				</button>
			</div>
			<div className="adInformation">
				<h2>{adObject.header}</h2>
				<a href="map.html">
					<FontAwesomeIcon icon={faMapMarkerAlt} />
					{adObject.city}
				</a>
				{
					readAll ?
						fullText.split("\n").map((text, key) => <p key={key}>{text}</p>)
						:
						<p>{shortText}</p>
				}

				{
					fullText !== shortText ?
						(
							<button onClick={() => setReadAll(!readAll)}>
								{readAll ? 'Stäng.' : 'Läs mer..'}
							</button>
						) :
						null
				}
				
				<div>
					<Link to={'/profil/' + adObject.userData[0]._id}>
						<img src={adObject.userData[0].imgUrl} alt="profile img" />
						{adObject.userData[0].name}<br />
						{adObject.userData[0].rating} <FontAwesomeIcon icon={faStar} />({adObject.userData[0].totalOfRatings})
					</Link>
				</div>
				<div>
					{messageToUserVisibility? <FirstMessageToAd adObject={adObject} isLoggedin={isLoggedIn}/> : null}
				</div>
			</div>
		</li>
		
	);
};

export default SingleAdCard;
