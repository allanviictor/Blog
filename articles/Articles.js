const sequelize = require('sequelize');
const connection = require('../database/connection')
const Category = require('../categories/Category')

const Article = connection.define('article',{
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    }, slug: {
        type: sequelize.STRING,
        allowNull: false
    }, body: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

// RELAÇÕES
Category.hasMany(Article) // 1 --> N (1 para N) 
Article.belongsTo(Category) // 1 --> 1 (1 para 1)



module.exports = Article 