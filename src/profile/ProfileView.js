import React from "react";

const ProfileView = () => {
	return (
		<div id="wrapper">
			<div>
				<div className="flex1">
					<div>
						<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
					</div>
					<div className="profileAbout">
						<div>Fredrika Lycke</div>
						<div className="rating">
							<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
						</div>
						<div>Har funnits på Pinboard sedan 2012</div>
						<div>
							<span>nål</span><span>Göteborg</span>
						</div>
					</div>
					<div className="settingsProfile">
						<div>
							<span>hjul</span><span>Inställningar</span>
						</div>
						<div>
							<span>öga</span><span>Antal besökare</span>
						</div>
					</div>

				</div>
				<div className="flex2">
					<div className="profileText">blabla</div>
					<div className="profileRating">
						<div>Grym</div><br />
						<div>Nja</div><br />
						<div>Ooops</div><br />
					</div>
				</div>
			</div>
		</div>

	)
};

export default ProfileView;
