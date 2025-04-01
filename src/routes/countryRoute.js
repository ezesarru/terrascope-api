const { Router } = require("express");
const countryRoute = Router();

const getCountryHandler = require("../handlers/getCountryHandler");
countryRoute.post("/", getCountryHandler);

module.exports = countryRoute;
