import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonService {
    async getPokemonById(id: number) {
        try {
          console.log(`Fetching Pokémon with ID: ${id}`);
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          return response.data;
        } catch (error) {
          console.error(`Failed to fetch Pokémon: ${error.message}`);
          throw error;
        }
      }
}
