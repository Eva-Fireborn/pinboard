import React from "react";

const CategoryList = () => {
	return (
		<div className="fixed">
			{/*
				should be swipe to horizontal scroll on mobile...
				https://css-tricks.com/simple-swipe-with-vanilla-javascript/
			*/}
			<h3>Kategorier:</h3>
			<ul>
				<li><h4>Musik</h4></li>
				<ul>
					<li>Gitarr</li>
					<li>Piano</li>
					<li>Fiol</li>
					<li>Flöjt</li>
				</ul>
				<li><h4>Mat</h4></li>
				<li><h4>Lek</h4></li>
			</ul>
		</div>
	)
};

export default CategoryList;