import React, { useEffect, useState } from "react";

function TeamStats({ listOfDetails }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
      }}
    >
      <h3 style={{ margin: 0 }}>Stats of my team:</h3>
      <p style={{ margin: 0 }}>
        Attack:
        {listOfDetails.reduce((result, pokemon) => {
          if (pokemon === null) return (result += 0);
          return (result += pokemon.stats[4].base_stat);
        }, 0)}
      </p>
      <p style={{ margin: 0 }}>
        Defense:
        {listOfDetails.reduce((result, pokemon) => {
          if (pokemon === null) return (result += 0);
          return (result += pokemon.stats[3].base_stat);
        }, 0)}
      </p>
      <p style={{ margin: 0 }}>
        Speed:
        {listOfDetails.reduce((result, pokemon) => {
          if (pokemon === null) return (result += 0);
          return (result += pokemon.stats[0].base_stat);
        }, 0)}
      </p>
    </div>
  );
}

function FavoritesPreview({ listOfDetails, favorites, removeFromFavorites }) {
  const [popup, setPopup] = useState(Array(6).fill({ display: "none" }));

  function showPopup(pokemonIndex) {
    popup[pokemonIndex] = { display: "block" };
    setPopup([].concat(popup));
  }

  function hidePopup(pokemonIndex) {
    popup[pokemonIndex] = { display: "none" };
    setPopup([].concat(popup));
  }

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100%",
        height: "450px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "space-around"
      }}
    >
      {listOfDetails.map((pokemon, index) => {
        return (
          <div
            key={index}
            style={{
              marginRight: "70px",
              flexBasis: "26%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div
              onMouseOver={() => showPopup(index)}
              onMouseOut={() => hidePopup(index)}
              style={{ position: "relative" }}
            >
              <img
                src={pokemon !== null ? pokemon.sprites.front_default : null}
                alt={pokemon !== null ? pokemon.name : null}
                style={{
                  width: "200px",
                  height: "200px"
                }}
              />
              <div
                style={{
                  display: popup[index].display,
                  position: "absolute",
                  left: "150px",
                  top: "50px",
                  width: "200px",
                  height: "100px",
                  background: "lightgrey",
                  zIndex: 1
                }}
              >
                <p style={{ margin: "5px", paddingLeft: "10px" }}>
                  Attack:{pokemon !== null ? pokemon.stats[4].base_stat : 0}
                </p>
                <p style={{ margin: "5px", paddingLeft: "10px" }}>
                  Defense:
                  {pokemon !== null ? pokemon.stats[3].base_stat : 0}
                </p>
                <p style={{ margin: "5px", paddingLeft: "10px" }}>
                  Speed:{pokemon !== null ? pokemon.stats[0].base_stat : 0}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromFavorites(favorites[index])}
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "12px",
                background: "red"
              }}
            >
              -
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function Favorites(props) {
  const [favorites, setFavorites] = useState(_ => {
    if (JSON.parse(localStorage.getItem("favorites")) === null)
      return Array(6).fill(null);
    return JSON.parse(localStorage.getItem("favorites"));
  });
  const [listOfDetails, setListOfDetails] = useState([]);
  function removeFromFavorites(path) {
    favorites[favorites.indexOf(path)] = null;
    setFavorites([].concat(favorites));
  }

  useEffect(() => {
    function getFavoritesFromLocalStorage(favorites) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    function fetchDataFromFavorites(favorites) {
      Promise.all(
        favorites.map(favorite => {
          if (favorite === null) return Promise.resolve(null);
          return fetch(favorite)
            .then(response => {
              return response.ok
                ? response.json()
                : new Error("Response is not OK");
            })
            .catch(console.log);
        })
      ).then(responses => setListOfDetails(responses));
    }
    getFavoritesFromLocalStorage(favorites);
    fetchDataFromFavorites(favorites);
  }, [favorites]);

  return (
    <>
      <TeamStats listOfDetails={listOfDetails} />
      <FavoritesPreview
        listOfDetails={listOfDetails}
        favorites={favorites}
        removeFromFavorites={removeFromFavorites}
      />
    </>
  );
}
