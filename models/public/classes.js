const db = require("./db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Classes = sequelize.define(
  "class",
  {
    class_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    subject_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    login_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    start: {
      type: DataTypes.TEXT,
    },
    end: {
      type: DataTypes.TEXT,
    },
    day: {
      type: DataTypes.TEXT,
    },
  },
  {
    underscored: true,
  }
);
