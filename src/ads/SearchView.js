import React from "react";

const SearchView = () => {
	return (
		<div class="search">
			{/* The search / filter should be it's own component */}
			<input type="text" placeholder="Sök" />

			<div>
				show map..
			</div>

			<select name="test">
				<option value="namn" selected>Namn</option>
				<option value="pris">Pris</option>
			</select>
		</div>
	);
};

export default SearchView;
