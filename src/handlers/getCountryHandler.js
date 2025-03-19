const getCountry = require("../controllers/getCountry");

const getCountryHandler = async (req, res) => {
  const { id, search, order, orderType, continent, pageNumber, itemsPerPage } =
    req.body;
  //* search = user input
  //* order = ASC, DESC
  //* orderType = population, name
  //* continent = All, Africa, America, Antarctica, Asia, Europe, Oceania
  //* pageNumber = 1, 2, ... 24, 25
  //* itemsPerPage = 10, 20, etc

  try {
    let response;

    switch (true) {
      // Fetch a country by ID
      case Boolean(id): {
        response = await getCountry({ id });
        if (!response) {
          return res.status(404).json({
            message: `Country with ID: ${"id"} is not in the database`,
          });
        }
        break;
      }
      // Fetch all countries or apply filters
      default: {
        response = await getCountry({
          search,
          order,
          orderType,
          continent,
          pageNumber,
          itemsPerPage,
        });
        if (!response.length) {
          return res.status(404).json({ message: "No countries found" });
        }
        break;
      }
    }
    return res.status(200).json({ data: response });
  } catch (error) {
    console.error("Error fetching country/countries", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getCountryHandler;
