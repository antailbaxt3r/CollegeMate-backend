const db = require("./db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Library = sequelize.define(
  "library",
  {
    file_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    login_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    public_id:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    name:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    path:{
      type: DataTypes.TEXT,
      allowNull:false,
    }
  },
  {
    underscored: true,
  }
);
