const sequelize = require('sequelize');
const conection = require('../database/connection')

const User = conection.define('users', {
    email: {
        type: sequelize.STRING,
        allowNull: false
    },password: {
        type: sequelize.STRING,
        allowNull: false
    }
})



module.exports = User;