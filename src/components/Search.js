import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const Search = ({ delMultipleUsers, search, setSearch }) => {
  return (
    <div className="search">
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search"
          className="panelSearch"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="DeleteSelected">
        <button onClick={delMultipleUsers} className="deleteSelectedbutton">
          <MdDeleteOutline size={30} color="white" />
        </button>
      </div>
    </div>
  );
};

export default Search;
