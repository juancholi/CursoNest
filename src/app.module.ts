import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ]
    }), // asegurarse de que esté al inicio ya que puede generar problemas en las tareas posteriores
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),// servir archivos estáticos desde la carpeta 'public'
    MongooseModule.forRoot(process.env.MONGODB), // conectar a la base de datos MongoDB utilizando variable de entorno
    PokemonModule, CommonModule, SeedModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // constructor(){
  //   console.log(process.env)
  // }
}
