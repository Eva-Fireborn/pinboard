import React from "react";
import CategoryList from "./CategoryList.js";
import SearchView from "./SearchView.js";
import SingleAdCard from "./SingleAdCard.js";

const AdsView = () => {
	return (
		<div id="wrapper">
			<aside>
				<CategoryList />
			</aside>
			<main>
				<SearchView />

				<SingleAdCard />
				<SingleAdCard />
				<SingleAdCard />
				<SingleAdCard />
			</main>
		</div>
	);
};

export default AdsView;
