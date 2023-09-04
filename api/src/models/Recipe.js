const { DataTypes } = require('sequelize');

//Model for a new Recipe
module.exports = (sequelize) => {
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    idApi: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    steps: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    },

    vegetarian: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    vegan: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    glutenFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    dairyFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

  }, { timestamps: false });
};