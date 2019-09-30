import React from "react";
import OwnersMenu from "./OwnersMenu.js";
import SingleAdCard from "../ads/SingleAdCard.js";
//import SingleReview from "./SingleReview.js";
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
			changeName: false,
			city: '',
			changeCity: false,
			description: '',
			changeDescription: false,
			changeUserInfoVisibility: true
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
					this.setState({ userAds: result.body })
				}, (error) => console.log(error)
			)
	}

	changeRemoveAccountVisibility = () => {
		this.setState({removeAccountVisibility: !this.state.removeAccountVisibility});
	}

	render() {
		const changeEditProfile = (state) => {
			this.setState({editProfile: state, changeUserInfoVisibility: true});
		}

		const validateUpdates = () => {
			let user = {};
			let name = this.state.name === '' ? this.state.profileData.name : this.state.name;
			let city = this.state.city === '' ? this.state.profileData.city : this.state.city;
			let description = this.state.description === '' ? this.state.profileData.description : this.state.description;

			user = {_id: this.props.isLoggedIn._id, city, name, description};
			console.log(user);
			//updateUser(user);
		}
		
		async function updateUser(user) {
				const serverResponse = await fetch('http://localhost:4000/ApiUpdateUser', {
					method: 'POST',
					body: JSON.stringify(user),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				});
				const res = await serverResponse.json();
				console.log('user updated: ', res.status, 'med user: ', user);
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
										SetEditProfile={changeEditProfile}
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
		
								{/* <section id="reviews">
							<h2>Betyg:</h2>
							<ul>
								waiting for backend stuff...
								<SingleReview />
								<SingleReview />
								<SingleReview />
							</ul>
						</section> */}
						{this.state.editProfile && this.state.changeUserInfoVisibility ? 
						<div id="loginPopup">
							<div id="loginWindow">
							<button className="close" onClick={() => this.setState({changeUserInfoVisibility: !this.state.changeUserInfoVisibility, editProfile: false})}>X</button>
								<div>
									{this.state.changeName ? 
										<div>
											<label htmlFor="name">New name: 
												<input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} /> 
											</label>
											<button onClick={() => this.setState({changeName: false})}>Save</button>
										</div>
									: 
									<div>
										<div>
											<div>{this.state.name === '' ? <div>Name: {this.state.profileData.name} </div> :  <div>Name: {this.state.name} </div>}</div>
											<button onClick={() => this.setState({changeName: true})}>Edit name</button>
										</div> 
									</div>
									}
								</div>
								<div>
									{this.state.changeCity ? 
										<div>
											<label htmlFor="city">New city: 
												<input type="text" value={this.state.city} onChange={(e) => this.setState({city: e.target.value})} /> 
											</label>
											<button onClick={() => this.setState({changeCity: false})}>Save</button>
										</div>
									: 
									<div>
										<div>
											<div>{this.state.city === '' ? <div>City: {this.state.profileData.city} </div> :  <div>City: {this.state.city} </div>}</div>
											<button onClick={() => this.setState({changeCity: true})}>Edit city</button>
										</div> 
									</div>
									}
								</div>
								<div>
									{this.state.changeDescription ? 
										<div>
											<label htmlFor="description">New description: 
												<input type="text" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} /> 
											</label>
											<button onClick={() => this.setState({changeDescription: false})}>Save</button>
										</div>
									: 
									<div>
										<div>
											<div>{this.state.description === '' ? <div>Description: {this.state.profileData.description} </div> :  <div>Description: {this.state.description} </div>}</div>
											<button onClick={() => this.setState({changeDescription: true})}>Edit description</button>
										</div> 
									</div>
									}
								</div>
								<button onClick={validateUpdates}>Send updates</button>
							</div>
							<div className="darkness"></div>
						</div>
						 : null }
						</main>
					</div >
				)
			}	
		}
	}
};

export default ProfileView;
