const express = require("express");
const pokeRoute = express.Router();
// const axios = require("axios");
const { Pokemon } = require("../../db");
const {
  getPokeApi,
  searchRepeated,
  getMyApi,
  filterSorting,
  paginate,
} = require("../functions/utils");

pokeRoute.get("/", async (req, res) => {
  const { name, pageNumber, type, sort } = req.query;
  // console.log(`nombre: ${name} \n tipo: ${type} \n orden: ${sort} \n numero de pagina: ${pageNumber}`);
  try {
    let result = [];
    // Se trae la data de la PokeApi y de la base de datos y se concatena
    const infoPokeApi = await getPokeApi(null);
    const infoMyApi = await getMyApi(null);
    const concatedResults = infoPokeApi.concat(infoMyApi);
    //-----------------------------------------------

    if (name !== "null" || type !== "null" || sort !== "null") {
      result = filterSorting(concatedResults, {
        name,
        type,
        sort,
      });
    } else {
      result = concatedResults;
    }
    if (result.length > 12 && pageNumber) {
      result = paginate(result, pageNumber);
    } else {
      result = {
        data: result,
        totalPages: 1,
      }
    }
    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

pokeRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!isNaN(id)) {
      const infoPokeApi = await getPokeApi(id);
      return res.status(200).send(infoPokeApi);
    } else {
      const infoMyApi = await getMyApi(id);
      return res.status(200).send(infoMyApi);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

pokeRoute.post("/", async (req, res) => {
  const { name, hp, attack, defense, speed, weight, height, types } = req.body;
  console.log("nombre", name);
  let { img } = req.body;
  if (!img)
    img =
      "https://w7.pngwing.com/pngs/282/481/png-transparent-pokemon-pokeball-illustration-pikachu-ash-ketchum-pokemon-pokeball-pokemon-johto-technology.png";
  try {
    if (await searchRepeated(name))
      return res.status(409).send("Pokemon ya existente");
    if (!name) return res.status(411).send("Se requiere un nombre");
    if (
      isNaN(hp) ||
      isNaN(attack) ||
      isNaN(defense) ||
      isNaN(speed) ||
      isNaN(weight) ||
      isNaN(height)
    )
      return res.status(422).send("Alguno de los datos no es un numero");

    const pokemon = await Pokemon.create({
      name: name,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      weight: weight,
      height: height,
      img: img,
    });
    if (!types.length) types = [1];
    await pokemon.setTipos(types);
    return res.status(201).json(pokemon);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = pokeRoute;
