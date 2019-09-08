import React from "react";

const MsgView = () => {
	return (
		<div id="wrapper">
			<aside>
				<div className="adUserName">
					<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
					<div>
						Magical unicorn user
					</div>
				</div>
				<div className="adUserName">
					<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
					<div>
						Unicorn lover
					</div>
				</div>
				<div className="adUserName">
					<img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
					<div>
						Horse
					</div>
				</div>
			</aside>
			<main>
				<div className="msgSelf">
					Vestibulum gravida ornare leo eu dictum
				</div>
				<div className="msgOther">
					Morbi pharetra velit in mi congue condimentum. Fusce finibus elit et nisl aliquam rhoncus.
				</div>
				<div className="msgSelf">
					Etiam pharetra sapien enim, nec facilisis massa dignissim a. Quisque nec bibendum magna.
				</div>
				<div className="msgOther">
					Morbi quis massa sem. Aliquam et magna magna. Nullam tincidunt lacus ut eros fringilla, id aliquet risus gravida. Morbi in aliquet enim, at consequat sapien.
				</div>
			</main>
		</div>
	);
};

export default MsgView;
