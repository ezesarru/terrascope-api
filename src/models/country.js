const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const country = sequelize.define(
    "country",
    {
      id: {
        // cca3
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },

      name: {
        // name.common
        type: DataTypes.STRING,
        allowNull: false,
      },

      flag: {
        // flags.png
        type: DataTypes.STRING,
        allowNull: false,
      },

      continent: {
        //* region
        type: DataTypes.STRING,
        allowNull: false,
      },

      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      population: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return country;
};
