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
		};

	}

	componentDidMount() {
		fetch(`http://localhost:4000/getUserByID/${this.props.match.params.userID}`)
			.then(res => res.json())
			.then(
				(result) => {
					if (result === null) {
						this.setState({ noUserFound: true })
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
		this.setState({ removeAccountVisibility: !this.state.removeAccountVisibility });
	}

	render() {
		const changeEditProfile = (state) => {
			this.setState({editProfile: state, changeUserInfoVisibility: true});
		}

		const validateUpdates = () => {
			let user = {};
			let userId;
			let name = this.state.name === '' ? this.state.profileData.name : this.state.name;
			let city = this.state.city === '' ? this.state.profileData.city : this.state.city;
			let description = this.state.description === '' ? this.state.profileData.description : this.state.description;

			if (this.props.isLoggedIn) {
				userId = this.props.isLoggedIn._id;
				user = {userId, city, name, description};
				updateUser(user);
				console.log('user: ', user, 'and user id: ', userId);
			}
		}


		const updateUser = async user => {
				const serverResponse = await fetch('http://localhost:4000/ApiUpdateUser', {
					method: 'POST',
					body: JSON.stringify(user),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				});
				const res = await serverResponse.json();
				console.log('user updated: ', res.status, 'med user: ', user);
				if (res.status === 200) {
					this.setState({
						changeUserInfoVisibility: !this.state.changeUserInfoVisibility,
						editProfile: false
					});
					// this.setState(this.state);
					// this.forceUpdate();
					window.location.reload(false);
				}
		}

		const reviewScroll = () => document.getElementById("reviews").scrollIntoView({ behavior: "smooth" });
		if (this.state.noUserFound) {
			return (
				<div id="wrapper">
					<p>Användaren finns inte.</p>
				</div>
			)
		} else {
			if (this.state.removeAccountVisibility) {
				return (<RemoveAccount
					changeRemoveAccountVisibility={this.changeRemoveAccountVisibility}
					isLoggedIn={this.props.isLoggedIn}
					logOff={this.props.logOff}
				/>)
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
										loggedIn={this.props.isLoggedIn}
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
						{this.state.editProfile && this.state.changeUserInfoVisibility ?
						<div className="dialogBackground">
							<div className="dialogWindow">
							<button className="dialogExitButton" onClick={() => this.setState({changeUserInfoVisibility: !this.state.changeUserInfoVisibility, editProfile: false})}>X</button>
								<div>
									{this.state.changeName ?
										<div className="changeDetails">
											<label htmlFor="name">Nytt namn: {" "}
												<input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
											</label>
											<button onClick={() => this.setState({changeName: false})}>Spara</button>
										</div>
									:
									<div>
										<div className="view-details">
											<div>{this.state.name === '' ? <div><span>Namn:</span> {this.state.profileData.name} </div> :  <div><span>Namn:</span> {this.state.name} </div>}</div>
											<button onClick={() => this.setState({changeName: true})}>Ändra namn</button>
										</div>
									</div>
									}
								</div>
								<div>
									{this.state.changeCity ?
										<div className="changeDetails">
											<label htmlFor="city">Nytt stad: {" "}
												<input type="text" value={this.state.city} onChange={(e) => this.setState({city: e.target.value})} />
											</label>
											<button onClick={() => this.setState({changeCity: false})}>Spara</button>
										</div>
									:
									<div>
										<div className="view-details">
											<div>{this.state.city === '' ? <div><span>Stad:</span> {this.state.profileData.city} </div> :  <div><span>Stad:</span> {this.state.city} </div>}</div>
											<button onClick={() => this.setState({changeCity: true})}>Ändra stad</button>
										</div>
									</div>
									}
								</div>
								<div>
									{this.state.changeDescription ?
										<div className="changeDetails">
											<label htmlFor="description">Nytt beskrivning: {" "}
												<input type="text" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
											</label>
											<button onClick={() => this.setState({changeDescription: false})}>Spara</button>
										</div>
									:
									<div>
										<div className="view-details">
											<div>{this.state.description === '' ? <div><span>Description:</span> {this.state.profileData.description} </div> :  <div><span>Description:</span> {this.state.description} </div>}</div>
											<button onClick={() => this.setState({changeDescription: true})}>Ändra beskrivning</button>
										</div>
									</div>
									}
								</div>
								<button className="bigButton" onClick={validateUpdates}>Updatera profil</button>
								<p className="warningText">*Varning! Sidan uppdateras efter att du har klickat på knappen</p>
							</div>
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
