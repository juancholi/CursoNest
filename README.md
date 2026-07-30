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
4. Levantar la base de datos
```
docker-compose up -d
```

## Stack usado
* MongoDB
* Nest
* Docker Desktop

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