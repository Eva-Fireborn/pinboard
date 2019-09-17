import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faMapMarkerAlt,
	faCommentsDollar,
	faStar
} from '@fortawesome/free-solid-svg-icons';

const SingleAdCard = () => {
	const [readAll, setReadAll] = useState(false);
	const fullText = `Sed iaculis dignissim arcu, at gravida est imperdiet eu. Maecenas posuere dolor nec nunc eleifend, eleifend ultricies orci iaculis. Vivamus ex orci, fermentum a enim ac, volutpat condimentum elit. Sed eleifend metus non metus malesuada, sed laoreet risus auctor. Nullam venenatis feugiat nunc, eget commodo ante ultrices vitae. Sed in fermentum mi. Nulla vitae consectetur odio. Pellentesque tempus, mi ut feugiat bibendum, eros felis pharetra tellus, id porta metus ipsum sed tellus. Donec pharetra leo at imperdiet eleifend. Pellentesque ac ultrices est.
	Curabitur in ligula vitae odio mollis blandit. Aliquam erat volutpat. Phasellus eget purus varius, suscipit ex id, bibendum sem. Aliquam ultrices ultricies magna, et placerat tortor. Cras tempor sagittis maximus. Pellentesque ut purus quis urna accumsan mollis. Sed sed luctus purus. Maecenas ac finibus sapien, sit amet mollis enim. Aliquam in leo vel enim blandit sollicitudin.`;
	const shortText = fullText.split(' ').splice(0, 25).join(' ');

	return (
		<div className="adCard">
			<div>
				<img src={require('../img/tempCourse.jpg')} alt="ads img" />
				<button className="price call">
					<FontAwesomeIcon icon={faCommentsDollar} /> 500 kr / månad
				</button>
			</div>
			<div className="adInformation">
				<h2>Lorem ipsum dolor sit amet</h2>
				<a href="map.html">
					<FontAwesomeIcon icon={faMapMarkerAlt} />
					Inside the magical forest
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
					<img src={require('../img/tempProfile.jpg')} alt="profile img" />
					Fredrika Lycke<br />
					4.24 <FontAwesomeIcon icon={faStar} /> (3)
				</div>
			</div>
		</div>
	);
};

export default SingleAdCard;
