import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchView = ({searchRubrik, searchText}) => {
    const [searchWord, setSearchWord] = useState(searchText);
    return (
        <div className="filter">
            <input className="search" type="text" placeholder="Sök rubrik" onChange={e => setSearchWord(e.target.value)} value={searchWord} />
            <button onClick={() => {
              setSearchWord('');
              searchRubrik(searchWord);
            }}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

export default SearchView;
