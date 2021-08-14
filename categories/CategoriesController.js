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
            res.redirect('/')
        })
    }else {
        res.redirect('admin/categories/news')
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



module.exports = router;