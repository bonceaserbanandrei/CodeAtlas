import { Controller, Get, Query} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('')
  getAllPokemon() {
    return this.pokemonService.getAllPokemon();
  }

  @Get('search')
  getSpecificPokemon(@Query('q') query: string) {
    return this.pokemonService.searchPokemon(query);
  }
}