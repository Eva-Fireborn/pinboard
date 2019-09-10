import React from "react";

const SearchView = () => {
	return (
		<div className="search">
			{/* The search / filter should be it's own component */}
			<input type="text" placeholder="Sök" />
			<select name="test">
				<option value="namn">Namn</option>
				<option value="pris">Pris</option>
			</select>
		</div>
	);
};

export default SearchView;
