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
    Articles.findAll().then((articles) => {
        if(articles != undefined){
            
            resp.render('home',{ articles: articles })
        }else{
            resp.redirect('/admin/artigos')
        }
    })
});

app.get('/:slug',(req,res) => {
    let slug = req.params.slug;
    Articles.findOne({
        where:{ slug: slug }
    }).then((artigo)=> {
        if(artigo != undefined){
            res.render('article', { artigo })
        }else{
            res.redirect('/')
        }
    }).catch((error) => {
        console.log('error', error)
    })
    
})



app.listen(8080, () => {
    console.log('servidor rodando !!')
});