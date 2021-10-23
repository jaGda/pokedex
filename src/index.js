import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Pokedex from "./Pokedex";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Pokedex />, document.getElementById("root"));

serviceWorker.unregister();
