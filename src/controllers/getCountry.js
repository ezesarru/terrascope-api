const { country } = require("../db");
const { Op } = require("sequelize");

const getCountry = async ({
  id,
  search,
  order,
  orderType,
  continent,
  pageNumber = 1,
  itemsPerPage = 10,
}) => {
  try {
    // Fetch a country by ID
    if (id) {
      const countryDetail = await country.findOne({
        where: { id },
      });
      return countryDetail;
    }

    // Fetch all countries or apply filters
    const whereConditions = {};

    // Search
    if (search) {
      whereConditions.name = { [Op.iLike]: `%${search}%` };
    }

    // Continent
    if (continent && continent !== "All") {
      whereConditions.continent = continent;
    }

    // Order
    const orderConfig =
      orderType && order ? [[orderType, order]] : [["population", "DESC"]];

    // Pagination
    const limit = itemsPerPage;
    const offset = (pageNumber - 1) * itemsPerPage;

    // Fetch countries with pagination and filters applied
    const countries = await country.findAll({
      where: whereConditions,
      order: orderConfig,
      limit,
      offset,
    });
    return countries;
  } catch (error) {
    console.error("Error getting countries:", error);
    throw error;
  }
};

module.exports = getCountry;
