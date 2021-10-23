import React from "react";
import photo from "./PokemonWorld.jpg";

export default function PokemonWorld() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "lightGray",
        height: "calc(100vh - 150px)"
      }}
    >
      <img
        src={photo}
        alt="Hello pokemon world!"
        style={{
          width: "80%"
        }}
      />
    </div>
  );
}
