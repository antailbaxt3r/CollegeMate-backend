const db = require("./db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Assignments = sequelize.define('assignment', {
    assignment_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    login_id:{
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    course_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_due: { 
        type: DataTypes.DATE,
        allowNull:false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
},  {
    underscored: true
});