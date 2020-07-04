const db = require("./db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Attendance = sequelize.define('attendance', {
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
    is_present:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
    }
},  {
    underscored: true
});