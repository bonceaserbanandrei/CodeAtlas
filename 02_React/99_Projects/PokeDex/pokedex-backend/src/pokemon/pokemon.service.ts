import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonService {

  private readonly POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
  private cachedPokemonList: { name: string; url: string }[] | null = null;
  private cacheTimestamp: number | null = null;
  private readonly CACHE_EXPIRY_TIME = 600000; // currently 10 minutes

  async getPokemonList(): Promise<{ name: string; url: string }[]> {
    
    const cacheValid = this.cachedPokemonList && this.cacheTimestamp && (Date.now() - this.cacheTimestamp < this.CACHE_EXPIRY_TIME);

    if (cacheValid) {
      console.log("Returning cached Pokémon list...");
      return this.cachedPokemonList!;
    }

    try {
      console.log("Retrieving the entire Pokémon list...");
      const response = await axios.get(`${this.POKEAPI_BASE_URL}/pokemon?limit=1304`);
      this.cachedPokemonList = response.data.results;
      this.cacheTimestamp = Date.now();

      if (this.cachedPokemonList) {
        return this.cachedPokemonList;
      } else {
        throw new Error("Failed to cache Pokémon list. Retrieved <null>");
      }
      
    } catch (error) {
      console.error(`Failed to fetch the Pokémon list: ${error.message}`);
      throw error;
    }       
  }

}
