import React from "react";

const Ads = () => {
	return (
		<article>
			<div class="search">
				{/* The search / filter should be it's own component */}
				<input type="text" placeholder="Sök" />

				<div>
					show map..
				</div>

				<select name="test">
					<option value="namn" selected>Namn</option>
					<option value="pris">Pris</option>
				</select>
			</div>

			<div className="adCard">
				{/* Each adCard should be it's own component with sub components */}
				<div>
					<img src={require('../img/tempCourse.jpg')} alt="ads img" className="ads" />
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
							💰 500 kr/månad
						</div>
					</div>
				</div>
			</div>

			<div className="adCard">
				<div>
					<img src={require('../img/tempCourse.jpg')} alt="ads img" className="ads" />
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
							💰 500 kr/månad
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

export default Ads;
