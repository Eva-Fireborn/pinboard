import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faFilter
} from '@fortawesome/free-solid-svg-icons';

const SearchView = () => {
	const [filter, setFilter] = useState(false);
	return (
		<div className="filter">
			<input className="search" type="text" placeholder="Sök" />
			<button onClick={() => setFilter(!filter)}>
				<FontAwesomeIcon icon={faFilter} />
			</button>
			{
				filter ?
					(<p>magical filter stuff</p>)
					: null
			}
		</div >
	);
};

export default SearchView;
