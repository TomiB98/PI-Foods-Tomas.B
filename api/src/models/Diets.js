const { DataTypes } = require('sequelize');

//Model for a Diet
module.exports = (sequelize) => {
    sequelize.define('diet', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // especifica un UUID generado automaticamente
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

    });
};