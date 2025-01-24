import { NestFactory } from '@nestjs/core';
import { PokemonModule } from './pokemon/pokemon.module';

async function bootstrap() {
  const app = await NestFactory.create(PokemonModule);
  app.enableCors({
    origin:'http://localhost:3001',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
