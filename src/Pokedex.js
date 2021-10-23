import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components";
import { Favorites, PokeList, PokemonWorld } from "./scenes";

function Pokedex() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={PokemonWorld} />
        <Route exact path="/pokemon-list" component={PokeList} />
        <Route exact path="/favorites" component={Favorites} />
      </Switch>
    </Router>
  );
}

export default Pokedex;
