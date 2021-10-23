import React, { useState, useEffect } from "react";

function List({ pokeList, favorites, setPokemonUrl }) {
  return (
    <div
      style={{
        height: "280px",
        display: "flex",
        justifyContent: "space-around"
      }}
    >
      <ul
        style={{
          padding: 0,
          listStyle: "none",
          columnCount: 2,
          columnGap: "2px",
          cursor: "pointer"
        }}
      >
        {pokeList.map(pokemon =>
          favorites.includes(pokemon.url) ? (
            <li
              key={pokemon.url}
              style={{
                margin: 0,
                fontWeight: "bold",
                color: "red",
                textAlign: "center",
                width: "350px",
                background: "lightGray"
              }}
              onClick={() => setPokemonUrl(pokemon.url)}
            >
              {pokemon.name}
            </li>
          ) : (
            <li
              key={pokemon.url}
              style={{ margin: 0, textAlign: "center", width: "350px" }}
              onClick={() => setPokemonUrl(pokemon.url)}
            >
              {pokemon.name}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function TogglePrevNext({ prev, next, setUrl }) {
  return (
    <div
      style={{
        height: "25px",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <button
        style={{ margin: "0 3%", fontFamily: "pokemon-font", width: "7%" }}
        onClick={() => {
          if (prev === null) return;
          setUrl(prev);
        }}
      >
        PREV
      </button>
      <button
        style={{ margin: "0 3%", fontFamily: "pokemon-font", width: "7%" }}
        onClick={() => {
          if (next === null) return;
          setUrl(next);
        }}
      >
        NEXT
      </button>
    </div>
  );
}

function PokemonDetailView({ favorites, pokemonUrl, addToFavorites }) {
  const [name, setName] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [types, setTypes] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    fetch(pokemonUrl)
      .then(response => {
        return response.ok ? response.json() : new Error("Response is not OK");
      })
      .then(response => {
        setName(response.name);
        setWeight(response.weight);
        setHeight(response.height);
        setTypes(response.types.map(pokemon => pokemon.type.name).join(" "));
        setImg(response.sprites.front_default);
      })
      .catch(console.log);

    localStorage.setItem("pokemonUrl", JSON.stringify(pokemonUrl));
  }, [pokemonUrl]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "250px"
      }}
    >
      <div>
        <img
          src={img}
          alt={name}
          style={{
            width: "200px",
            height: "200px"
          }}
        />
      </div>
      <div
        style={{
          paddingLeft: "10px",
          width: "350px",
          height: "200px"
        }}
      >
        <p>Name: {name}</p>
        <p>Weight: {weight}</p>
        <p>Height: {height}</p>
        <p>Types: {types}</p>
        {favorites.includes(null) ? (
          <button
            onClick={() => addToFavorites(pokemonUrl)}
            style={{ margin: "0 3%", fontFamily: "pokemon-font" }}
          >
            MY FAVORITE
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function PokeList(props) {
  const [favorites, setFavorites] = useState(_ => {
    if (JSON.parse(localStorage.getItem("favorites")) === null)
      return Array(6).fill(null);
    return JSON.parse(localStorage.getItem("favorites"));
  });

  useEffect(
    () => localStorage.setItem("favorites", JSON.stringify(favorites)),
    [favorites]
  );

  function addToFavorites(path) {
    if (favorites.indexOf(path) !== -1 || favorites.indexOf(null) === -1)
      return;
    favorites[favorites.indexOf(null)] = path;
    setFavorites([].concat(favorites));
  }

  const [url, setUrl] = useState(_ => {
    if (JSON.parse(localStorage.getItem("url")) === null)
      return "https://pokeapi.co/api/v2/pokemon/";
    return JSON.parse(localStorage.getItem("url"));
  });

  const [pokeList, setPokeList] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        return response.ok ? response.json() : new Error("Response is not OK");
      })
      .then(response => {
        setPokeList(response.results);
        setPrev(response.previous);
        setNext(response.next);
      })
      .catch(console.log);

    localStorage.setItem("url", JSON.stringify(url));
  }, [url]);

  const [pokemonUrl, setPokemonUrl] = useState(_ => {
    if (JSON.parse(localStorage.getItem("pokemonUrl")) === null) return null;
    return JSON.parse(localStorage.getItem("pokemonUrl"));
  });

  return (
    <div>
      <List
        pokeList={pokeList}
        favorites={favorites}
        setPokemonUrl={setPokemonUrl}
      />
      <TogglePrevNext prev={prev} next={next} setUrl={setUrl} />
      <PokemonDetailView
        favorites={favorites}
        pokemonUrl={pokemonUrl}
        addToFavorites={addToFavorites}
      />
    </div>
  );
}
