import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonService implements OnModuleInit {

  private readonly POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
  private cachedPokemonData: {[key: string]: any} = {};

  // CACHING VARIABLES
  private cacheTimestamp: number | null = null;
  private readonly CACHE_EXPIRY_TIME = 3600000; // currently 60 minutes

  async onModuleInit() {
    console.log("🔄 Preloading Pokémon data...");
    await this.loadAllPokemon();
    console.log("✅ Pokémon data preloaded successfully!");
  }
  
  async loadAllPokemon() {

    const cacheValid = this.cachedPokemonData && this.cacheTimestamp && (Date.now() - this.cacheTimestamp < this.CACHE_EXPIRY_TIME);

    if(cacheValid) {
      console.log("Retrieving the cached Pokémon list...");
      return this.cachedPokemonData
    }
    try{
      console.log("Retrieving Pokémon list from PokeAPI...");
      const pokemonListResponse = await axios.get(`${this.POKEAPI_BASE_URL}/pokemon?limit=1304`);
      const pokemonList = pokemonListResponse.data.results;

      const pokemonPromises = pokemonList.map(async (pokemon) => {
        try {
          const pokemonData = await axios.get(pokemon.url);
          const {name, id, sprites, types} = pokemonData.data;
          return {
            name,
            id,
            image: sprites.other['official-artwork'].front_default,
            types: types.map(typeInfo => typeInfo.type.name),

          };
        } catch (error) {
          console.error(`Failed to fetch data for ${pokemon.name}: ${error.message}`);
          return null;
        }
      });

      const pokemonDataList = await Promise.all(pokemonPromises);


      this.cachedPokemonData = pokemonDataList.reduce((acc, pokemon) => {
            if (pokemon) acc[pokemon.name] = pokemon;
            return acc;
        }, {} as Record<string, any>);

        this.cacheTimestamp = Date.now();

        console.log("Cached Pokémon data!");
        return this.cachedPokemonData;
      
    } catch (error) {
      console.log(`Failed to fetch Pokémon list. Error: ${error.message}`);
    }
  }

  async getAllPokemon() {
    const cacheValid = this.cachedPokemonData && this.cacheTimestamp && (Date.now() - this.cacheTimestamp < this.CACHE_EXPIRY_TIME);
    if (cacheValid) {
        console.log("Retrieving cached Pokémon data...");
        return this.cachedPokemonData;
    } else {
        console.log("Cache expired or empty. Reloading data...");
        return await this.loadAllPokemon();
    }
  }

  async searchPokemon(query: string) {
    if (!this.cachedPokemonData || Object.keys(this.cachedPokemonData).length === 0) {
      throw new Error('Pokémon data is not loaded yet.');
    }

    const pokemonArray = Object.values(this.cachedPokemonData);

    if (!isNaN(Number(query))) {
      const foundById = pokemonArray.find(pokemon => pokemon.id === Number(query));
      if (foundById) {
        console.log(`Found Pokemon by ID: ${query}`);
        return foundById;
      }
    }

    const foundByName = pokemonArray.find(pokemon => pokemon.name === query);
    if (foundByName) {
      console.log(`Found Pokemon by Name: ${query}`);
      return foundByName;
    }

    return {error: "No Pokemon found"};
  }
}
