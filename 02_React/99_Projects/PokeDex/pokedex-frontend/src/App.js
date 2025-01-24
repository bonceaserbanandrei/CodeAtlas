import React, { useState } from "react";
import PokemonCard from "./PokemonCard";

const App = () => {
  const [pokemonId, setPokemonId] = useState(""); // Store the current Pokémon ID
  const [searchId, setSearchId] = useState(null); // Store the ID to display

  const handleSearch = () => {
    if (pokemonId.trim()) {
      setSearchId(pokemonId.trim());
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Pokédex</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Pokémon ID or Name"
          value={pokemonId}
          onChange={(e) => setPokemonId(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      {searchId ? (
        <PokemonCard id={searchId} />
      ) : (
        <p>Enter a Pokémon ID or name to search!</p>
      )}
    </div>
  );
};

export default App;