import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    // private readonly pokemonService: PokemonService
  ){}

  async executeSeed(limit: number) {

    // const createPokemonDto: CreatePokemonDto[] = [];
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    const{data} = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

    const insertPromisesArray = [];

    data.results.forEach(async ({name, url}) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      console.log({segments, no})
      // createPokemonDto.push({name,no})

      // this.pokemonService.create({name,no})
      // await this.pokemonModel.create({name,no}) // no es practico para grandes volumenes de datos

      insertPromisesArray.push(
        this.pokemonModel.create({name,no})
      );

    });

    await Promise.all( insertPromisesArray );

    // this.pokemonService.create()
    return `Seed executed`;
    // return data.results;
  }

}
