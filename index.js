const express = require('express')
const app = express()
const conection = require('./database/connection')
const CategoriesController = require('./categories/CategoriesController')
const ArticlesController = require('./articles/ArticlesController')

const Categories = require('./categories/Category')
const Articles = require('./articles/Articles')

//view engine 
app.set('view engine', 'ejs')

//express static files
app.use(express.static('public'))

//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


conection
    .authenticate()
    .then(() => {
        console.log('conexao feita com sucesso')
    })
    .catch((error) =>{
        console.log(error)
    })


app.use('/',CategoriesController);
app.use('/',ArticlesController);


app.get('/',(req, resp) => {
    resp.render('index')
});

app.listen(8080, () => {
    console.log('servidor rodando !!')
});