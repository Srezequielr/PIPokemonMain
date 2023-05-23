const express = require("express");
const typesRoute = express.Router();
const { Tipo } = require("../../db");

typesRoute.get("/", async (req, res) => {
  try {
    const data = await Tipo.findAll();
    const types = data.map((data) => data.dataValues);
    res.status(200).send(types);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = typesRoute;
