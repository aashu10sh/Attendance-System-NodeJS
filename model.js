const { Sequelize, Model, DataTypes } = require('sequelize');
const sql = new Sequelize('database', 'user', 'password', {
	dialect: 'sqlite',
	storage: './database.sqlite',
});

class Users extends Model{}


class Log extends Model{}
Users.init({
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
}, { sequelize : sql, modelName: 'user' })


Log.init({
    fullname: DataTypes.STRING,

},{sequelize: sql, modelName: 'log' })
module.exports =  {Users, sql, Log};

