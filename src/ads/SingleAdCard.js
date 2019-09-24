import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import {
	faMapMarkerAlt,
	faCommentsDollar,
	faStar
} from '@fortawesome/free-solid-svg-icons';

const SingleAdCard = ({ adObject }) => {
	const [readAll, setReadAll] = useState(false);
	let [userInfo, updateUserInfo] = useState(null);
	const fullText = adObject.description;
	const shortText = fullText.split(' ').splice(0, 25).join(' ');

	console.log(adObject);

	/*useEffect( () => {

			fetch('http://localhost:4000/ApiGetUserForAd/'+ adObject.userId)
			.then((response) => {
				//let res = JSON.parse(response)
				//updateUserInfo(res);
				console.log(response)
				return response.json();
			})
			.then(function (myJson){
				console.log(myJson);
			})
			
		
		fetch('http://localhost:4000/ApiGetUserForAd')
		.then(res => res.json())
		.then( (result) => {
			let parsedResult = JSON.parse(result.body);
			console.log('result: ', parsedResult)
		  },
		  // Note: it's important to handle errors here
		  // instead of a catch() block so that we don't swallow
		  // exceptions from actual bugs in components.
		  (error) => {
			  console.log(error)
		  }
		)
	}, [adObject])*/

	return (
		<li className="adCard">
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
					<Link to="#">
						<img src={require('../img/tempProfile.jpg')} alt="profile img" />
						Fredrika Lycke<br />
						4.24 <FontAwesomeIcon icon={faStar} />(3)
					</Link>
				</div>
			</div>
		</li>
	);
};

export default SingleAdCard;
