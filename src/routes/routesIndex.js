const { Router } = require("express");
const countryRoute = require("./countryRoute");
const router = Router();

router.use("/country", countryRoute);

module.exports = router;
