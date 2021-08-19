const express = require('express');
const router = express.Router();
const Category = require('../categories/Category')
const Articles = require('./Articles')
const slugify = require('slugify')

router.get('/admin/artigos',(req,res) => {
    Articles.findAll({ include: [{ model: Category }] }).then(artigos => {
        if(artigos != undefined){
            res.render('admin/articles/index', { artigos })
        }else{
            res.redirect('admin/articles/index')
        }
        
    })
})

router.get('/admin/artigos/novo',(req,res)=> {
    Category.findAll().then((category)=> {

        res.render('admin/articles/new',{ categorias: category })
    })
})

router.post('/save/articles',(req,res)=> {
    let title = req.body.title
    let body = req.body.body
    let category = req.body.category
    Articles.create({
        titulo: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(()=>{
        res.redirect('/admin/artigos')
    })
})


router.post('/delete/article',(req,res) => {
    let id = req.body.id

    if(id != undefined){
        if(!isNaN(id)){
            Articles.destroy({
                where: { id: id }
            }).then(()=> {
                res.redirect('/admin/artigos')
            })

        }else{
            res.redirect('/admin/artigos')
        }
    }else{
        res.redirect('/admin/artigos')
    }
})

router.get('/admin/artigos/editar/:id',(req,res)=> {
    let id = req.params.id

    
    Articles.findByPk(id).then((article)=> {
        if(article != undefined){
            Category.findAll().then((categorias)=> {
                res.render('admin/articles/edit',{
                    artigos: article,
                    categorias: categorias
                })
            })
        }
    })
})

router.post('/articles/update',(req,res)=> {
    let id = req.body.id
    let body = req.body.body
    let titulo = req.body.titulo

    Articles.update({ titulo: titulo, body: body }, {where: { id: id }}).then(()=>{
        res.redirect('/admin/artigos')
    })

})

module.exports = router;