import React from "react";
import CategoryList from "./CategoryList.js";
import SingleAdCard from "./SingleAdCard.js";

class AdsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listOfAds: [],
		}
	}

	componentDidMount() {
		console.log('loggedIn: ', this.state.isLoggedIn)
		fetch('http://localhost:4000/ApiGetAllAds')
			.then(res => res.json())
			.then((result) => {
				let parsedResult = JSON.parse(result.body);
				let ads = [];
				parsedResult.forEach(res => {
					ads.push(res)
				});
				 return this.setState({
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
	}
	/*componentDidUpdate() {
		console.log('didUpdate: ', this.state.isLoggedIn)
		// Typical usage (don't forget to compare props):
		if (this.props.isLoggedIn !== this.state.isLoggedIn) {
		  this.fetchData(this.props.isLoggedIn);
		}
	  }*/


	render() {
		return (
			<div id="wrapper">
				<aside className="ads">
					<CategoryList />
				</aside>
				<main id="ads">
					<ul>
						{this.state.listOfAds && this.state.listOfAds.length ?
							this.state.listOfAds.map((ad, key) =>
								<SingleAdCard key={key} adObject={ad} isLoggedIn={this.props.isLoggedIn}/>)
							:
							null}
					</ul>
				</main>
			</div>
		)
	}
};

export default AdsView;
