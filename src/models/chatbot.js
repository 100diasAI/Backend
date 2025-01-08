const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("chatbot", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    pregunta: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    respuesta: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  });
}; 