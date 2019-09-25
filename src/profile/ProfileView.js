import React from "react";
import OwnersMenu from "./OwnersMenu.js";
import SingleAdCard from "../ads/SingleAdCard.js";
import SingleReview from "./SingleReview.js";
import ProfileSideList from "./ProfileSideList.js";


class ProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			owner: false,
			editProfile: false,
			userAds: [],
			profileData: {}
		}
	}


	componentDidMount() {
		fetch(`http://localhost:4000/getUserByID/${this.props.match.params.userID}`)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({ profileData: result })
					if (this.state.profileData._id === this.props.isLoggedIn._id)
						this.setState({ owner: true })
				}, (error) => console.log(error)
			)

		fetch(`http://localhost:4000/getAllAdsByUser/${this.props.match.params.userID}`)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({ userAds: result.body })
				}, (error) => console.log(error)
			)
	}

	render() {
		const reviewScroll = () => document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
		return (
			<div id="wrapper">
				<aside className="profile">
					<img src={this.state.profileData.imgUrl} alt="profile img" />
					<section>
						<h1>{this.state.profileData.name}</h1>
						<h5>Medlem på Pinboard sedan {typeof this.state.profileData.memberSince} --> change to .getFullYear().</h5>
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
					</section>
				</aside>
				<main className="profile">
					<h2>Om mig:</h2>
					<section>
						<p>
							{this.state.profileData.description}
						</p>
					</section>

					<section>
						<h2>Min tjänster:</h2>
						<ul>
							{
								this.state.userAds && this.state.userAds.length ?
									this.state.userAds.map((ad, key) =>
										<SingleAdCard key={key} adObject={ad} />)
									: null
							}
						</ul>
					</section>

					<section id="reviews">
						<h2>Betyg:</h2>
						<ul>
							waiting for backend stuff...
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
