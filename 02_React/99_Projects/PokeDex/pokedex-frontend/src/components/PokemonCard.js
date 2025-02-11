import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonCard.css';

const apiURL = window.location.hostname === 'localhost'
? 'http://localhost:3000'
: `http://${window.location.hostname}:3000`;

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPokemon(null);
    axios
    .get(`${apiURL}/pokemon/?name=${name}`)
    .then((response) => {
        setPokemon(response.data);
        setLoading(false);
    })
    .catch((err) => {
        console.error(err);
        setError("Failed to fetch Pokémon data. Please try again.");
        setLoading(false);
    });
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>No Pokémon found. Try a different name!</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  

  return (
    <div className='pokemon-card'>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>
        <strong>Type:</strong>{" "}
        {pokemon.types.map((type) => type.type.name).join(", ")}
      </p>
    </div>
  );
};

export default PokemonCard;