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
    course_name:{
      type:DataTypes.TEXT,
      allowNull: false
    },
    course_code:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    login_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    faculty:{
      type: DataTypes.TEXT,
    },
    start: {
      type: DataTypes.TEXT,
    },
    end: {
      type: DataTypes.TEXT,
    },
    day: {
      type: DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
  }
);
