import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    // private readonly pokemonService: PokemonService
    private readonly http: AxiosAdapter
  ){}

  async executeSeed(limit: number) {

    const pokemonToInsert: CreatePokemonDto[] = []; // insertar multiples registros v2
    await this.pokemonModel.deleteMany({}); // delete * from pokemons

    // const{data} = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

    // const insertPromisesArray = []; // insertar multiples registros v1

    data.results.forEach(async ({name, url}) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      // console.log({segments, no})
      pokemonToInsert.push({name,no}) // insertar multiples registros v2

      // this.pokemonService.create({name,no})
      // await this.pokemonModel.create({name,no}) // no es practico para grandes volumenes de datos

      // insertPromisesArray.push(this.pokemonModel.create({name,no})); // insertar multiples registros v1

    });

    // await Promise.all( insertPromisesArray ); // insertar multiples registros v1
    await this.pokemonModel.insertMany(pokemonToInsert); // insertar multiples registros v2 (es el simil de 'insert into pokemon (name, no)')

    // this.pokemonService.create()
    return `Seed executed`;
    // return data.results;
  }

}
