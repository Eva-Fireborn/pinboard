import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchView = ({searchRubrik}) => {
    const [searchWord, setSearchWord] = useState('');
   
    return (
        <div className="filter">
            <input className="search" type="text" placeholder="Sök rubrik" onChange={e => setSearchWord(e.target.value)}/>
            <button onClick={() => searchRubrik(searchWord)}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

export default SearchView;
