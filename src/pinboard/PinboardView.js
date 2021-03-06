import React from "react";
import SingleAdCard from "../ads/SingleAdCard.js";

class PinboardView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listOfAds: [],
		}
	}

	componentDidMount() {
		fetch('http://localhost:4000/ApiGetLatest')
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
	}


	render() {
		return (
			<div id="wrapper" className="pinboard">
				<main className="pinboard">
					<ul>
						{this.state.listOfAds && this.state.listOfAds.length ?
							this.state.listOfAds.map((ad, key) =>
								<SingleAdCard key={key} adObject={ad} />)
							:
							null}
					</ul>
				</main>
			</div>
		)
	}
};

export default PinboardView;
