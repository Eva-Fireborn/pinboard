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
			profileData: {},
			name: '',
			changeName: false
		}
	}


	componentDidMount() {
		fetch(`http://localhost:4000/getUserByID/${this.props.match.params.userID}`)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({ profileData: result })
					if (this.props.isLoggedIn) {
					if (this.state.profileData._id === this.props.isLoggedIn._id)
						this.setState({ owner: true })
					}
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

		console.log('name is: ', this.state.name);
		return (
			<div id="wrapper">
				<aside className="profile">
					<img src={this.state.profileData.imgUrl} alt="profile img" />
					<section>
						<h1>{this.state.profileData.name}</h1>
						<h5>Medlem på Pinboard sedan {this.state.profileData.memberSince}.</h5>
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
						<h2>Mina tjänster:</h2>
						<ul>
							{
								this.state.userAds && this.state.userAds.length ?
									this.state.userAds.map((ad, key) =>
										<SingleAdCard key={key} adObject={ad} />)
									: null
							}
						</ul>
					</section>

					{/* <section id="reviews">
						<h2>Betyg:</h2>
						<ul>
							waiting for backend stuff...
							<SingleReview />
							<SingleReview />
							<SingleReview />
						</ul>
					</section> */}
					{/* {this.state.editProfile ?  */}
					<div id="loginPopup">
						<div id="loginWindow">
							<div>
								{this.state.changeName ? 
									<div>
										<label htmlFor="name">Name
											<input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} /> 
										</label>
										<button onClick={() => this.setState({changeName: false})}>Save</button>
									</div>
								: 
								<div>
									<p>{this.state.name === '' ? this.state.profileData.name : this.state.name}</p> 
									<button onClick={() => this.setState({changeName: true})}>Edit name</button>
								</div>
								}
							
							
							</div>
							{/* <div>
							<label htmlFor="city">City
								<input type="text" value="city" /> 
							</label>
							<button>Update</button>
							</div>
							<div>
							<label htmlFor="description">Description
								<input type="text" value="description" /> 
							</label>
							<button>Update</button>
							</div> */}
							<button>Send updates</button>
						</div>
						<div className="darkness"></div>
					</div>
					{/* : null }  */}
					
				</main>
			</div >
		)
	}
};

export default ProfileView;
