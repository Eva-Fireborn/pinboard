import React from "react";
import SearchView from "./SearchView.js";
import SingleCategory from "./SingleCategory.js";

const CategoryList = () => {
	const category = [
		{
			title: 'Musik',
			subCat: ['Gitarr', 'Piano', 'Fiol', 'Flöjt']
		},
		{
			title: 'Mat',
			subCat: ['Laga mat', 'Mat provning', 'Vin provning', 'Öl provning', 'Munching']
		},
		{
			title: 'Lek',
			subCat: ['Magic', 's...', 'Slut på idéer']
		}
	]

	return (
		<div className="fixed">
			<SearchView />

			<h3>Kategorier:</h3>
			<ul>
				{category.map((s) => <SingleCategory category={s} key={s.title} />)}
			</ul>
		</div>
	)
};

export default CategoryList;