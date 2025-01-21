const express = require("express");
const typesRoute = express.Router();
const { Type } = require("../../db");

typesRoute.get("/", async (req, res) => {
  try {
    const data = await Type.findAll();
    const types = data.map((data) => data.dataValues);
    console.log(types);
    
    res.status(200).send(types);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = typesRoute;
