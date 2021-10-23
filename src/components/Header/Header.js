import React from "react";
import { header, h1, navLink } from "./Header.module.css";
import { NavLink, withRouter } from "react-router-dom";

const activeLinkStyle = {
  color: "white",
  backgroundColor: "rgb(156, 154, 154)"
};

function Header(props) {
  return (
    <header className={header}>
      <h1 className={h1} onClick={() => props.history.push("./")}>
        POKEDEX
      </h1>
      <NavLink
        className={navLink}
        activeStyle={activeLinkStyle}
        to="/pokemon-list"
      >
        POKEMON LIST
      </NavLink>
      <NavLink
        className={navLink}
        activeStyle={activeLinkStyle}
        to="/favorites"
      >
        FAVORITES
      </NavLink>
    </header>
  );
}

export default withRouter(Header);
