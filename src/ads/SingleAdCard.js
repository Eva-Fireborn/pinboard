import React from "react";

const SingleAdCard = () => {
	return (
		<div className="adCard">
			<div>
				<img src={require('../img/tempCourse.jpg')} alt="ads img" />
			</div>
			<div className="adInformation">
				<h2>Lorem ipsum dolor sit amet</h2>
				<a href="map.html">Inside the magical forest</a>
				<br /><br /><br />

				<div className="adUserName">
					<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
					<div>
						Magical unicorn user<br />
						4.24 ★ (12)
					</div>
					<div>
						<span role="img" aria-label="Påse med pengar">💰</span> 500 kr/månad
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleAdCard;
