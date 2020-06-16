// This file is used to initialize db and make associations
const Sequelize = require('sequelize');
const sequelize = require('./public/db').sequelize;

const db = {};

// The cache configuration
var Redis = require('ioredis');
db.cache = Redis;

db.Sequelize = Sequelize;

db.Op = Sequelize.Op; // Very important
db.sequelize = require('../models/public/db')
db.public = require("./public/models");

//subjects
db.public.login.hasMany(db.public.subjects, { foreignKey: 'login_id', onDelete: 'CASCADE', constraints: false, allowNull: false });
db.public.subjects.belongsTo(db.public.login, { foreignKey: 'user_id', onDelete: 'CASCADE', constraints: false, allowNull: false });

db.public.login.hasMany(db.public.subjects, { foreignKey: 'login_id', onDelete: 'CASCADE', constraints: false, allowNull: false });
db.public.assignments.belongsTo(db.public.login, { foreignKey: 'user_id', onDelete: 'CASCADE', constraints: false, allowNull: false });

//classes
db.public.login.hasMany(db.public.classes, { foreignKey: 'login_id', onDelete: 'CASCADE', constraints: false, allowNull: false })
db.public.classes.belongsTo(db.public.login, { foreignKey: 'login_id', onDelete: 'CASCADE', constraints: false, allowNull: false });
db.public.classes.belongsTo(db.public.subjects, { foreignKey: 'subject_id', onDelete: 'CASCADE', constraints: false, allowNull: false });

//For making the relations on the local database.
/*sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })  
*/

module.exports = db;