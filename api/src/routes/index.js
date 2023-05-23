const { express, Router } = require("express");
const { Pokemon, Tipo } = require("../db");
const axios = require("axios");
const typesRoute = require("./routing/typesRoute");
const pokeRoute = require("./routing/pokeRoute");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// router.use("/", (req, res) => {});

router.use("/types", typesRoute);
router.use("/pokemons", pokeRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
