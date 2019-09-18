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
		fetch('http://localhost:4000/ApiGetAllAds')
		.then(res => res.json())
		.then( (result) => {
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
	}
	
	
	render () {
		return (
		<div id="wrapper">
			<aside className="ads">
				<CategoryList />
			</aside>
			<main id="ads">
			{this.state.listOfAds && this.state.listOfAds.length ?
						this.state.listOfAds.map( (ad, key) => 
						<SingleAdCard key={key} adObject={ad}/> )
						:
						null}
			</main>
		</div>
		)
	}
};

export default AdsView;