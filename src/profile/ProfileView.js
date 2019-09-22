import React from "react";
import OwnersMenu from "./OwnersMenu.js";
import SingleAdCard from "../ads/SingleAdCard.js";
import SingleReview from "./SingleReview.js";
import ProfileSideList from "./ProfileSideList.js";


class ProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listOfAds: [],
			owner: true,
			editProfile: false,
			profileData: {
				name: 'Fredrika Lycke',
				about: 'Lite om mig och så...  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id mauris ac erat dapibus tempus sit amet bibendum nisi. Aliquam magna erat, iaculis sit amet laoreet a, viverra quis metus. Fusce ac ultricies felis, vel vulputate mauris. Quisque et suscipit nunc. Nullam in facilisis erat, ut posuere erat. Ut volutpat.',
				location: 'Göteborg',
				language: ['Svenska', 'Engelska']
			}
		}
	}
	

	/*componentDidMount() {
		console.log('isloggedin: ',this.props.isLoggedIn)
		fetch('http://localhost:4000/ApiGetAllAds')
			.then(res => res.json())
			.then((result) => {
				let parsedResult = JSON.parse(result.body);
				let ads = [];
				parsedResult.forEach(res => {
					ads.push(res)
				});
				this.setState({
					listOfAds: ads
				});
			},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					console.log(error)
				}
			)
	}*/

	render() {
		const reviewScroll = () => document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
		return (
			<div id="wrapper">
				<aside className="profile">
					{this.props.isLoggedIn ? <img src={this.props.isLoggedIn.imgUrl} alt="profile img" /> : null}
					<section>
						<h1>{this.props.isLoggedIn? this.props.isLoggedIn.name : this.state.profileData.name}</h1>
						<h5>Medlem på Pinboard sedan {this.props.isLoggedIn? this.props.isLoggedIn.memberSince : 2012}.</h5>
						<ProfileSideList
							reviewScroll={reviewScroll}
							profileData={this.state.profileData}
							editProfile={this.state.editProfile}
							isLoggedIn={this.props.isLoggedIn}
						/>
					</section>

					<section>
						{this.state.owner ?
							<OwnersMenu
								SetEditProfile={
									() => this.setState({
										editProfile: !this.state.editProfile
									})
								}
								logOff={this.props.logOff}
							/>
							: null
						}
						<button onClick={() => this.setState({
							owner: !this.state.owner
						})}>
							Temp Flip Owner State
					</button>
					</section>
				</aside>
				<main className="profile">
					<h2>Om mig:</h2>
					<section>
						<p>
							{this.props.isLoggedIn? this.props.isLoggedIn.description : this.state.profileData.about}
						</p>
					</section>

					<section>
						<h2>Min tjänster:</h2>
						{this.state.listOfAds && this.state.listOfAds.length ?
							this.state.listOfAds.map((ad, key) =>
								<SingleAdCard key={key} adObject={ad} />)
							:
							null}
					</section>

					<section id="reviews">
						<h2>Betyg:</h2>
						<ul>
							<SingleReview />
							<SingleReview />
							<SingleReview />
						</ul>
					</section>
				</main>
			</div >
		)
	}
};

export default ProfileView;
