# Individual Project - PokeApp - Henry

<img height="150" src="./pokemon.png" />

## Presentacion 🗣️

Este es mi proyecto individual de Henry donde tuve que desarrollar un SPA en el que gestioné datos de una API (Pokeapi) y de una base de datos PostgreSQL para poder cargar sus propios Pokemons.

## Historia 📚

Este proyecto fue asignado en diciembre de 2022. En esa primera instancia, no tuve lo suficiente para aprobar el proyecto. Sin embargo, en mayo de 2023, retomé esa antigua carpeta y en tan solo una semana logré alcanzar y superar ampliamente los requisitos mínimos de aquel entonces.

## Caracteristicas

#Front end:
- Diseño responsive
- Scroll infinito
- Colores acordes con la tematica
- IU y UX Simple e intuitiva
- Codigo refactorizado
- Atencion al manejo de errores
- Busqueda por querys

#Back end:
- Filtrado 
- Ordenamiento
- Busqueda 
- Borrado logico
- Paginado
- Relaciones
- Creacion de datos

## Deploy

https://pi-pokemon-main-pi.vercel.app/

## Notas 🗒️

Si por al algun motivo quiere desplegar la aplicacion de forma local es necesario:

- Clonar el repositorio
- Instalar las dependencias de la carpeta Client y Api 
- Para hacer funcionar la API
  - La base de datos esta desplegada en postgreSQL, hay que crear una db en la consola con el nombre pokemon
  - Crear un archivo con el nombre .env donde se guardaran las variables de entorno
    Los nombres son los siguientes;
    DB_USER: {Nombre de usuario}
    DB_PASSWORD: {contraseña}
    DB_HOST: localhost
    DB_NAME: pokemon
  - en la consola de la carpeta Api despues de haber instalado las dependencias ejecutar el comando npm start
- Para hacer funcionar el Cliente  
  - Agregar un archivo .env.local dentro de la carpeta Client con lo siguiente:
    REACT_APP_URL_API=http://localhost:3001
  - Despues de haber instalado las dependencias ejecutar el comando npm start  

#### Tecnologías Utilizadas

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres
- [ ] Material UI
- [ ] Styled Components
- [ ] Axios
