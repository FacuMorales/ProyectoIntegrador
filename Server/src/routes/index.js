const express = require("express");
const routerIndex = express.Router();

const getCharById = require("../controllers/getCharById");
const login = require("../controllers/login");
const {postFav, deleteFav} = require("../controllers/handleFavorites");

routerIndex.get("/character/:id", getCharById);
routerIndex.get("/login", login);
routerIndex.post("/fav", postFav);
routerIndex.delete("/fav/:id", deleteFav);

module.exports = routerIndex;