import React, { useState } from "react";
/* import "./style.css"; */

function Search({ history }) {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Entrer le nom du produit ..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <div className="input-group-append">
          <button
            id="search_btn"
            className="btn"
            style={{
              background: "white",
              color: "#6C757D",
              borderColor: "#CED4DA",
            }}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default Search;
