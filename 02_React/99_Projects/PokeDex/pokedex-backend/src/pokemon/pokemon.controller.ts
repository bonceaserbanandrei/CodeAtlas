import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('all')
  getPokemonList() {
    return this.pokemonService.getPokemonList();
  }

 /*  @Get(':id')
  getPokemonById(@Param('id') id: string) {
    return this.pokemonService.getPokemonById(+id);
  } */
}