const express = require('express')
const router = express.Router();
const category = require('./Category')
const slugify = require('slugify')


router.get('/admin/categorias/news', (req, res) => {
    res.render('admin/categories/news') // o ejs identifica a partir da pasta views 
})

router.post('/categorias/save',(req, res) => {
    let title = req.body.title
    if(title != ''){
        category.create({
            title: title,
            slug: slugify(title)
        }).then(()=> {
            res.redirect('/admin/categorias')
        })
    }else {
        res.redirect('/admin/categorias')
    }
})


router.post('/categories/delete',(req,res)=> {
    let id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
            category.destroy({
                where:{ id: id }
            }).then(()=> {
                res.redirect('/admin/categorias')
            })
        }else{
            res.redirect('/admin/categorias')
        }

    }else {
        res.redirect('/admin/categorias')
    }
})


router.get('/admin/categorias',(req,res) => {
   category.findAll().then((categories)=> {
        res.render('admin/categories/index', {
            catetories: categories
        })

    })


})

router.get('/admin/categorias/editar/:id',(req,res) => {
    let id = req.params.id
    if(isNaN(id)){
        res.redirect('/admin/categorias')
    }
    
    console.log('caiu aqui')
    category.findOne({ where: { id } }).then((categorie)=> {
        if(categorie != undefined){
            res.render('admin/categories/edit',{ catergorie: categorie})
        }else{
            res.redirect('/admin/categorias')
        }
    })

})

router.post('/categories/update',(req,res)=> {
    let id = req.body.id;
    let titulo = req.body.titulo

    category.update({ title:titulo, slug: slugify(titulo) },{ //atualize o titulo e slug da categoria
        where: { id: id } // onde o id seja igual o id da requisição
    }).then(()=> {
        res.redirect('/admin/categorias')
    })
})



module.exports = router;