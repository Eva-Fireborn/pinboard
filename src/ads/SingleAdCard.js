import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import {
	faMapMarkerAlt,
	faStar
} from '@fortawesome/free-solid-svg-icons';
import FirstMessageToAd from './FirstMessageToAd';

const SingleAdCard = ({ adObject, isLoggedIn }) => {
	const [readAll, setReadAll] = useState(false);
	let [messageToUserVisibility, updateMessageToUserVisibility] = useState(false);
	const fullText = adObject.description;
	const shortText = fullText.split(' ').splice(0, 25).join(' ');
	let img;
	if (adObject.category === 'djur'){
		img = <img src={require('../img/adsImg/djur.jpg')} alt="ads img" />
	} else if (adObject.category === 'fritid'){
		img = <img src={require('../img/adsImg/fritid.jpg')} alt="ads img" />
	} else if (adObject.category === 'hustjänster'){
		img = <img src={require('../img/adsImg/hustjänster.jpg')} alt="ads img" />
	} else if (adObject.category === 'musik'){
		img = <img src={require('../img/adsImg/musik.jpg')} alt="ads img" />
	} else if (adObject.category === 'transport'){
		img = <img src={require('../img/adsImg/transport.jpg')} alt="ads img" />
	} else if (adObject.category === 'trädgård'){
		img = <img src={require('../img/adsImg/trädgård.jpg')} alt="ads img" />
	} else if (adObject.category === 'undervisning') {
		img = <img src={require('../img/adsImg/undervisning.jpg')} alt="ads img" />
	} else {
		img = <img src={require('../img/adsImg/övrigt.jpg')} alt="ads img" />
	}
	

	return (
		<li className="adCard">
			<div>
				{img}
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
