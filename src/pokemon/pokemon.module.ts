import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([ // Esto es para que mongoose sepa que hay un modelo llamado Pokemon y que schema tiene que usar
      {
        name: Pokemon.name, //name: Pokemon.name, //nombre del modelo
        schema: PokemonSchema
      }
    ])
  ],
  // exports: [PokemonService, MongooseModule] // Para exportar el servicio, bastaría con exportar el MongooseModule
  exports: [ MongooseModule ] // Para exportar el servicio, bastaría con exportar el MongooseModule
})
export class PokemonModule {}
