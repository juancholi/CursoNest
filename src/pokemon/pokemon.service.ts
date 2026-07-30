import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { IsMongoId } from 'class-validator';


@Injectable()
export class PokemonService {

  constructor(
    
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

  ) {}


  async create(createPokemonDto: CreatePokemonDto) {

    try{
      
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    const newPokemon = await this.pokemonModel.create(createPokemonDto)
    return newPokemon;

    }
    catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon already exists in db ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error)
      throw new InternalServerErrorException(`Can't create pokemon - Check server logs`)

    }
    
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // Busqueda por Mongo Id
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    // Busqueda por nombre
    if(!pokemon) pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });

    if(!pokemon) throw new NotFoundException(`Pokemon with term "${term}" was not found`);

    return pokemon;
  }

  update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
