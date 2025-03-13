import React, { useState, useEffect} from "react";
import PokemonCard from "./components/PokemonCard";
import '../src/styles/App.css';
import axios from "axios";

const apiURL = window.location.hostname === 'localhost'
? 'http://localhost:3000'
: `http://${window.location.hostname}:3000`;

function changeTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');

  let target = "light";

  if(currentTheme === "light") {
    target = "dark";
  }

  document.documentElement.setAttribute('data-theme', target);
}

export default function PokeDex() {
  const [userSearch, setUserSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pokemonArray, setPokemonArray] = useState([]);
  const [filterApplied, setFilter] = useState([]);
  const allTypes = [
    "grass", "bug", "dark",
    "dragon", "electric", "fairy", 
    "fighting", "fire", "flying", 
    "ghost", "ground", "ice", 
    "normal", "poison", "psychic", 
    "rock", "steel", "water"
  ];

  function handleInputChange(event) {
    setUserSearch(event.target.value);
  }

  function handleFilter(typeFilter) {
    setFilter((prevFilters) => 
      prevFilters.includes(typeFilter)
      ? prevFilters.filter((t) => t !== typeFilter)
      : [...prevFilters, typeFilter]
    );
  }
  
  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setDebouncedSearch(userSearch);
    }, 200);
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [userSearch]);

  useEffect(() => {
    async function getPokemonArray() {
      try {
        const response = await axios.get(`${apiURL}/pokemon`);
        setPokemonArray(Object.values(response.data));
      } catch (error) {
        console.error(`Failed to fetch all Pokémon from the backend server. Error: ${error.message}`);
      }
    }
    getPokemonArray();
  }, []);
  
  
  const displayedPokemon = pokemonArray.filter(
    (pokemon) =>
  {
    const bySearch =
      debouncedSearch.length === 0 ||
      pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      pokemon.id.toString().includes(debouncedSearch);

    const byFilter =
      filterApplied.length === 0 ||
      pokemon.types.some((type) => 
        filterApplied.some((filterApplied) => 
          type.toLowerCase().includes(filterApplied.toLowerCase()))
    );

    return bySearch && byFilter;
  });

  return (
    <>
      <div className="pokedex_container">
        <div className="title">
          <img src="pokedex.png" alt="PokéDex"></img>
        </div>
        <input type="checkbox" name="data-theme" onClick={changeTheme}/>
        <input
          type="text"
          placeholder="Enter Pokémon ID or Name"
          value={userSearch}
          onChange={handleInputChange}
        />       
        <p>Enter a Pokémon ID or name to search!</p>
        {allTypes.map((type) => (
          <button key={type} onClick={() => handleFilter(type)}>{type}</button> 
        ))}
        <button onClick={() => setFilter([])}>Clear Filters</button>
        <hr></hr>
        <ul className="card-list">{displayedPokemon.map((pokemon) => (
          <li key={pokemon.id}><PokemonCard key={pokemon.id} pokemonQuery={pokemon} /></li>
        ))}
        </ul>
      </div>
    </>
  );
};
