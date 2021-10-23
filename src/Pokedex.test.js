import React from "react";
import ReactDOM from "react-dom";
import Pokedex from "./Pokedex.js";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Pokedex />, div);
  ReactDOM.unmountComponentAtNode(div);
});
