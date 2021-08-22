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
        console.log('conexao com o banco ok !!')
    })
    .catch((error) =>{
        console.log('erro com o banco', error)
    })


app.use('/',CategoriesController);
app.use('/',ArticlesController);


app.get('/',(req, resp) => {
    Articles.findAll({limit: 4}).then((articles) => {
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
        /* console.log('error', error) */
    })
    
})

app.get('/admin/articles/paginacao/:num', (req,res)=> {
    let pagina = req.params.num
    let offset = 0;

    if(isNaN(pagina) || parseInt(pagina) == 1 || parseInt(pagina) == 0  ){
        offset = 0;
    }else{
        offset = (parseInt(pagina) - 1) * 4
    }

    Articles.findAndCountAll({
        limit: 4,
        offset: offset
    }).then((artigos)=> {

        let next;

        if(offset + 4 >= artigos.count){
            next = false
        }else{
            next = true
        }

        var result = {
            next,
            pageCurrent: parseInt(pagina) ,
            artigos,
        }


        res.render('admin/articles/pagination',{ result })
        /* console.log('result',result) */
        
    })
})



app.listen(8080, () => {
    console.log('servidor ok !!')
});