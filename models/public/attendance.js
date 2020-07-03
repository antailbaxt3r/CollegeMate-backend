const db = require("./db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Assignments = sequelize.define('assignment', {
    attendance_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    subject_id:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    present:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }
},  {
    underscored: true
});