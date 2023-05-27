const axios = require("axios");
const { Pokemon, Tipo } = require("../../db");

//Busca todos los pokemons de Pokeapi. No filtra nada
const getPokeApi = async () => {
  try {
    const infoapiFP = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const infoapiSP = await axios.get(infoapiFP.data.next);
    const infoapi = infoapiFP.data.results.concat(infoapiSP.data.results);
    const infoPokeApi = await Promise.all(
      infoapi.map(async (pokemon) => {
        let pokemonData = await axios
          .get(pokemon.url)
          .then((response) => response.data);
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          hp: pokemonData.stats[0].base_stat,
          attack: pokemonData.stats[1].base_stat,
          defense: pokemonData.stats[2].base_stat,
          speed: pokemonData.stats[5].base_stat,
          weight: pokemonData.weight,
          height: pokemonData.height,
          img: pokemonData.sprites.other.dream_world.front_default,
          types: pokemonData.types.map((type) => type.type.name),
        };
      })
    );

    const result = infoPokeApi.map((pokemon) => {
      return {
        name: pokemon.name,
        id: pokemon.id,
        types: pokemon.types,
        img: pokemon.img,
      };
    });
    return result;
  } catch (error) {
    return error.message;
  }
};
//-----------------------------------------------

//Toma los datos de la base de datos. No filtra nada
const getMyApi = async () => {
  try {
    const data = await Pokemon.findAll({
      include: [
        {
          model: Tipo,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    const infoMyApiNT = data.map((data) => data.dataValues);

    infoMyApi = infoMyApiNT.map((data) => {
      return {
        ...data,
        types: data.tipos.map((tipo) => tipo.name),
      };
    });

    const result = infoMyApi.map((pokemon) => {
      return {
        name: pokemon.name,
        id: pokemon.id,
        types: pokemon.tipos,
        img: pokemon.img,
      };
    });
    return result;
  } catch (error) {
    return error.message;
  }
};
//-----------------------------------------------

//Busca si ya hay un pokemon que se quiere crear en la base de datos
const searchRepeated = async (name) => {
  try {
    const resultMyApi = await Pokemon.findAll({
      where: {
        name: name,
      },
    });
    const result = await getPokeApi();
    const resultPokeApi = result.some((pokemon) => pokemon.name === name);
    if (resultMyApi.length > 0 || resultPokeApi) return true;
    return false;
  } catch (error) {
    return error.message;
  }
};
//-----------------------------------------------

//Obtiene todos los tipos de pokemon
const getTypes = async () => {
  try {
    const data = await axios
      .get("https://pokeapi.co/api/v2/type")
      .then((response) => response.data.results);
    const types = data.map((data) => {
      return {
        name: data.name,
      };
    });
    return types;
  } catch (error) {
    return error;
  }
};
//-----------------------------------------------

//Filtrado, busqueda y ordenamiento
const filterSorting = (data, { name, type, sort }) => {
  if (sort !== "null") {
    result = sorting(data, sort);
  }
  if (name !== "null" && type !== "null") {
    console.log("Tengo que buscar y filtrar");
    result = search(data, name);
    result = filter(result, type);
  } else if (name !== "null") {
    console.log("Solo tengo que buscar");
    result = search(data, name);
  } else if (type !== "null") {
    console.log("solo tengo que filtrar");
    result = filter(data, type);
  }
  return result;
};
//-----------------------------------------------

//Busqueda por nombre por coincidencia
const search = (data, name) => {
  const result = data.filter((pokemon) =>
    pokemon.name.toUpperCase().includes(name.toUpperCase())
  );
  return result;
};
//-----------------------------------------------

//Filtrado por tipo
const filter = (data, pointer) => {
  const result = data.filter((pokemon) =>
    pokemon.types.some((type) => type === pointer)
  );
  return result;
};
//-----------------------------------------------

//Ordenado X poder y alfabeto
const sorting = (data, pointer) => {
  let result = data.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
  if (pointer === "maxMin" || pointer === "ZA") {
    result = result.reverse();
  }
  return result;
};
//-----------------------------------------------

//Paginado
const paginate = (data, pageNumber) => {
  const dividedArray = [];
  for (let i = 0; i < data.length; i += 12) {
    const chunk = data.slice(i, i + 12);
    dividedArray.push(chunk);
  }
  return {
    data: dividedArray[pageNumber - 1],
    totalPages: dividedArray.length,
  };
};
//-----------------------------------------------

module.exports = {
  getPokeApi,
  getMyApi,
  searchRepeated,
  getTypes,
  filterSorting,
  paginate,
};
