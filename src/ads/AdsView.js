import React from "react";
import CategoryList from "./CategoryList.js";
import SingleAdCard from "./SingleAdCard.js";

const AdsView = () => {
	return (
		<div id="wrapper">
			<aside className="ads">
				<CategoryList />
			</aside>
			<main className="ads">
				<SingleAdCard />
				<SingleAdCard />
				<SingleAdCard />
				<SingleAdCard />
				<SingleAdCard />
				<SingleAdCard />
			</main>
		</div>
	);
};

export default AdsView;
