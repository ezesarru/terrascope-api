const { countriesData } = require("./countriesData.json");
const { country } = require("../src/db");

const saveData = async () => {
  try {
    for (let {
      cca3,
      name,
      flags,
      region,
      capital,
      population,
    } of countriesData) {
      const notApply = "N/A";
      const countryCapital = (Array.isArray(capital) && capital[0]) || notApply;
      const countryName = name.common || name.official;

      await country.findOrCreate({
        where: { id: cca3 },
        defaults: {
          name: countryName,
          flag: flags.png,
          continent: region,
          capital: countryCapital,
          population,
        },
      });
    }
    console.log("Data saved in database");
  } catch (error) {
    console.log("Data not saved in database", error);
  }
};

module.exports = saveData;
