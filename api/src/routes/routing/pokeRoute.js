const express = require("express");
const pokeRoute = express.Router();
// const axios = require("axios");
const { Pokemon } = require("../../db");
const { getPokeApi, searchRepeated, getMyApi } = require("../functions/utils");

pokeRoute.get("/", async (req, res) => {
  const { name, pageNumber } = req.query;
  try {
    const infoPokeApi = await getPokeApi(name, null);
    const infoMyApi = await getMyApi(name, null);
    if (!infoPokeApi) return res.status(200).send(infoMyApi);
    if (!infoMyApi) return res.status(200).send(infoPokeApi);
    const result = infoPokeApi.concat(infoMyApi);
    if (pageNumber) {
      const dividedArray = [];
      for (let i = 0; i < result.length; i += 12) {
        const chunk = result.slice(i, i + 12);
        dividedArray.push(chunk);
      }
      return res.status(200).send({data: dividedArray[pageNumber - 1],
      totalPages: dividedArray.length});
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
      const infoPokeApi = await getPokeApi(null, id);
      return res.status(200).send(infoPokeApi);
    } else {
      const infoMyApi = await getMyApi(null, id);
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
