import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Search/search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="searchform">
      <div className="searchcontainer">
        <input
          className="inputbar"
          type="text"
          placeholder="Search for Product..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="searchbutton" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
