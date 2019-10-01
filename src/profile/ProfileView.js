import React from "react";
import OwnersMenu from "./OwnersMenu.js";
import SingleAdCard from "../ads/SingleAdCard.js";
import SingleReview from "./SingleReview.js";
import ProfileSideList from "./ProfileSideList.js";
import RemoveAccount from './RemoveAccount';
import moment from 'moment'

class ProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			owner: false,
			editProfile: false,
			userAds: [],
			profileData: {},
			removeAccountVisibility: false,
			noUserFound: false,
			name: '',
			changeName: false
		}
	}

	componentDidMount() {
		fetch(`http://localhost:4000/getUserByID/${this.props.match.params.userID}`)
			.then(res => res.json())
			.then(
				(result) => {
					if (result === null) {
						this.setState({noUserFound: true})
					} else {
						this.setState({ profileData: result })
					if (this.props.isLoggedIn) {
					if (this.state.profileData._id === this.props.isLoggedIn._id)
						this.setState({ owner: true })
					}
					}
				}, (error) => console.log(error)
			)

		fetch(`http://localhost:4000/getAllAdsByUser/${this.props.match.params.userID}`)
			.then(res => res.json())
			.then(
				(result) => {
					console.log('ads retuned from bkd', result.body)
					this.setState({ userAds: result.body })
				}, (error) => console.log(error)
			)
	}

	changeRemoveAccountVisibility = () => {
		this.setState({removeAccountVisibility: !this.state.removeAccountVisibility});
	}

	render() {
		async function updateUser() {
				//let user = {_id: this.props.isLoggedIn._id, city, name, description};
				const serverResponse = await fetch('http://localhost:4000/ApiUpdateUser', {
					method: 'POST',
					//body: JSON.stringify(user),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				});
				const res = await serverResponse.json();
				console.log('user updated: ', res.status);
		}

		const reviewScroll = () => document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
		if (this.state.noUserFound) {
			return(
				<div id="wrapper">
					<p>Användaren finns inte.</p>
				</div>
			)
		} else {
			if (this.state.removeAccountVisibility){
				return (<RemoveAccount
					changeRemoveAccountVisibility={this.changeRemoveAccountVisibility}
					isLoggedIn={this.props.isLoggedIn}
					logOff={this.props.logOff}
					/> )
			} else {
				const timestamp = this.state.profileData.memberSince;
				const formattedDate = moment(timestamp).format('L');
				return (
					<div id="wrapper">
						<aside className="profile">
							<img src={this.state.profileData.imgUrl} alt="profile img" />
							<section>
								<h1>{this.state.profileData.name}</h1>
								<h5>Medlem på Pinboard sedan {formattedDate}.</h5>
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
										changeRemoveAccountVisibility={this.changeRemoveAccountVisibility}
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
								<h2>Mina annonser:</h2>
								<ul>
									{
										this.state.userAds && this.state.userAds.length ?
											this.state.userAds.map((ad, key) =>
												<SingleAdCard key={key} adObject={ad} />)
											: null
									}
								</ul>
							</section>
						</main>
					</div >
				)
			}
		}
	}
};

export default ProfileView;
