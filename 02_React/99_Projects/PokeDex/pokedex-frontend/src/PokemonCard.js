import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonCard = ({ id }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPokemon(null);
    axios
    .get(`http://localhost:3000/pokemon/${id}`)
    .then((response) => {
        setPokemon(response.data);
        setLoading(false);
    })
    .catch((err) => {
        console.error(err);
        setError("Failed to fetch Pokémon data. Please try again.");
        setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!pokemon) return <p>No Pokémon found. Try a different ID!</p>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textTransform: "capitalize" }}>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>
        <strong>Type:</strong>{" "}
        {pokemon.types.map((type) => type.type.name).join(", ")}
      </p>
    </div>
  );
};

export default PokemonCard;