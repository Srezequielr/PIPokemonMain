const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    hp:{
      type: DataTypes.INTEGER,
    },
    attack:{
      type: DataTypes.INTEGER
    },
    defense:{
      type: DataTypes.INTEGER,
    },
    speed:{
      type: DataTypes.INTEGER
    },
    weight:{
      type: DataTypes.INTEGER
    },
    height:{
      type: DataTypes.INTEGER
    },
    img:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
  });
};
