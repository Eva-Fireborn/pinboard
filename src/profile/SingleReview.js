import React from "react";
import { Link } from "react-router-dom";

const SingleReview = () => {
	return (
		<li>
			<div>
				<span>☆☆☆☆☆</span><br />
				Grym, bästa piano läraren här. Något man inte kan tror när man ser hens hovar.
			</div>
			<Link to="#">
				<img src={require('../img/tempProfile2.jpg')} alt="profile img" /><br />
				Jane Doe<br />
				<span>2019-01-01</span>
			</Link>
		</li>
	);
};

export default SingleReview;
