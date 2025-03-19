const { Router } = require("express");
const countryRoute = Router();

const getCountryHandler = require("../handlers/getCountryHandler");
countryRoute.get("/", getCountryHandler);

module.exports = countryRoute;
