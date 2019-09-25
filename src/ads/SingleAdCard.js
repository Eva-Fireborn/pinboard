import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import {
	faMapMarkerAlt,
	faStar
} from '@fortawesome/free-solid-svg-icons';
import FirstMessageToAd from './FirstMessageToAd';

const SingleAdCard = ({ adObject, isLoggedIn }) => {
	const [readAll, setReadAll] = useState(false);
	let [userInfo, updateUserInfo] = useState(null);
	const fullText = adObject.description;
	const shortText = fullText.split(' ').splice(0, 25).join(' ');

	useEffect( () => {

			fetch('http://localhost:4000/ApiGetUserForAd/'+ adObject.userId)
			.then((response) => {
				return response.json();
			})
			.then(function (myJson){
				let res = myJson;
				updateUserInfo({
					name: res.name,
					imgUrl: res.imgUrl,
					totalOfRatings: res.totalOfRatings,
					rating: res.rating,
					userId: res._id
				})
			})
	}, [])

	return (
		<li className="adCard">
			<div>
				<img src={require('../img/tempCourse.jpg')} alt="ads img" />
				<button className="price call">
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
					{userInfo ? (<Link to={"/profil/" + userInfo.userId}>
						<img src={userInfo.imgUrl} alt="profile img" />
						{userInfo.name}<br />
						{userInfo.rating} <FontAwesomeIcon icon={faStar} />({userInfo.totalOfRatings})
					</Link>) : null}
				</div>
			</div>
		
		</li>
		
	);
};

export default SingleAdCard;
/*	<div>
		<FirstMessageToAd userInfo={userInfo} isLoggedIn={isLoggedIn} />
		</div>*/
