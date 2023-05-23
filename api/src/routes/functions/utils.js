const axios = require("axios");
const { Pokemon, Tipo } = require("../../db");

const getPokeApi = async (name, id) => {
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
    if (name) {
      return infoPokeApi.filter((poke) => poke.name == name)[0];
    }
    if (id) {
      return infoPokeApi.filter((poke) => poke.id == id)[0];
    } else {
      const result = infoPokeApi.map((pokemon) => {
        return {
          name: pokemon.name,
          id: pokemon.id,
          types: pokemon.types,
          img: pokemon.img,
        };
      });
      return result;
    }
  } catch (error) {
    return error.message;
  }
};

const getMyApi = async (name, id) => {
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
    infoMyApi = infoMyApiNT.map((data)=>{
      return{
        ...data,
        types: data.tipos.map(tipo => tipo.name)
      }
    });
    console.log(infoMyApi);
    if (name) {
      return infoMyApi.filter((poke) => poke.name == name)[0];
    }
    if (id) {
      return infoMyApi.filter((poke) => poke.id == id)[0];
    } else {
      const result = infoMyApi.map((pokemon) => {
        return {
          name: pokemon.name,
          id: pokemon.id,
          types: pokemon.tipos,
          img: pokemon.img,
        };
      });
      return result;
    }
  } catch (error) {}
};

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

module.exports = {
  getPokeApi,
  getMyApi,
  searchRepeated,
  getTypes,
};
