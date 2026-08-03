<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio

2. Ejecutar el comando
```
yarn install
```
3. Tener instalado Nest CLI
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos:
```
docker-compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar esta copia a ```.env```

6. llenar las variables de entorno definidas en el archivo ___.env___

7. ejecutar la aplicación en dev:
```
yarn start:dev
```

8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/seed/200
```

## Stack usado
* MongoDB
* Nest
* Docker Desktop


## Nota de actualización - mongoose

Durante el desarrollo de los ejercicios se encontró un problema con la versión de mongoose.

No encontré info respecto al issue, pero la forma de evitarlo fue instalando la versiones utilizadas por Fernando en el desarrollo de la clase 7.

```
yarn add @nestjs/mongoose@9.1.1 mongoose@6.4.2
```


## Nota de actualización - Axios
En la siguiente clase, instalamos el paquete axios para realizar las peticiones HTTP.

En la última versión del mismo, está dando inconvenientes con NestJS (cannot read properties of undefined).

Pueden ver la issue sin resolver a día de hoy: https://github.com/axios/axios/issues/5100.

Por lo que a la hora de instalar axios, recomendamos instalen la versión 0.27.2 hasta que liberen una versión superior con el inconveniente solventado.

Pueden usar el comando
```
yarn add axios@0.27.2
```
o
```
npm install axios@0.27.2
```

## Para utilizar variables de entorno desde un archivo .env

1. Crear en el root del proyecto el archivo .env

2. agregar @nestjs/config al proyecto utilizando el comando:
```
    yarn add @nestjs/config
```
o
```
    npm install @nestjs/config
```

3. En el archivo app.module.ts asegurarse de importar "ConfigModule.forRoot()"
```
    import { Module } from '@nestjs/common';
    import { ConfigModule } from '@nestjs/config';
    @Module({
    imports: [ConfigModule.forRoot()],
    })
    export class AppModule {}
```