import React, { useState } from "react";
import { Link } from "react-router-dom";

const SingleCategory = ({ category }) => {
	const [visibility, changeVisibility] = useState(false);

	return (
		<li><h4 onClick={() => changeVisibility(!visibility)}>{category.title}</h4>
			{
				visibility ?
					(<ul>{category.subCat.map((s) => <Link to={'#' + s} key={s}><li>{s}</li></Link>)}</ul>)
					:
					null
			}
		</li>
	)
};

export default SingleCategory;