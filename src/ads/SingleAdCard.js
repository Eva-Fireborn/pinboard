import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faMapMarkerAlt,
	faCommentsDollar,
	faStar
} from '@fortawesome/free-solid-svg-icons';

const SingleAdCard = ({adObject}) => {
	const [readAll, setReadAll] = useState(false);
	const fullText = adObject.description;
	const shortText = fullText.split(' ').splice(0, 25).join(' ');

	return (
		<div className="adCard">
			<div>
				<img src={require('../img/tempCourse.jpg')} alt="ads img" />
				<button className="price call">
					<FontAwesomeIcon icon={faCommentsDollar} /> {adObject.price} kr
				</button>
			</div>
			<div className="adInformation">
				<h2>{adObject.title}</h2>
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

				<button onClick={() => setReadAll(!readAll)}>
					{readAll ? 'Stäng.' : 'Läs mer..'}
				</button>

				<div>
					<img src={adObject.userImg} alt="profile img" />
					{adObject.userName}<br />
					{adObject.userRating} <FontAwesomeIcon icon={faStar} /> ({adObject.userNumberOfRates})
				</div>
			</div>
		</div>
	);
};

export default SingleAdCard;
