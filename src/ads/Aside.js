import React from "react";

const AdsAside = () => {
	return (
		<div>
			{/*
				should be swipe to horizontal scroll on mobile...
				https://css-tricks.com/simple-swipe-with-vanilla-javascript/
			*/}
			<ul>
				<li><h5>Musik</h5></li>
				<ul>
					<li>Gitarr</li>
					<li>Piano</li>
					<li>Fiol</li>
					<li>Flöjt</li>
				</ul>
				<li><h5>Mat</h5></li>
				<li><h5>Lek</h5></li>
			</ul>
		</div>
	)
};

export default AdsAside;