import { NestFactory } from '@nestjs/core';
import { PokemonModule } from './pokemon/pokemon.module';

async function bootstrap() {
  const app = await NestFactory.create(PokemonModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
