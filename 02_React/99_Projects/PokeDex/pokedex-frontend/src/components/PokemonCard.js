import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PokemonCard.css';

const apiURL = window.location.hostname === 'localhost'
? 'http://localhost:3000'
: `http://${window.location.hostname}:3000`;

const PokemonCard = ({ query }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPokemon(null);
    axios
    .get(`${apiURL}/pokemon/search?q=${query}`)
    .then((response) => {
        setPokemon(response.data);
        setLoading(false);
    })
    .catch((err) => {
        console.error(err);
        setError("Failed to fetch Pokémon data. Please try again.");
        setLoading(false);
    });
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>No Pokémon found. Try a different name!</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  

  return (
    <div className='pokemon-card'>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>
        <strong>Type:</strong>{" "}
      </p>
    </div>
  );
};

export default PokemonCard;