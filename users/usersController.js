const express = require('express');
const router = express.Router()
const User = require('./user');
const bcrypt = require('bcryptjs');

router.get('/admin/login',(req,res) => {
    User.findAll().then((users)=>{
        if(users != undefined){
            res.render('admin/user/listagemUsers',{ users: users })
        }
    })
})

router.get('/admin/login/novousuario',(req,res)=> {
    res.render('admin/user/user')
})

router.post('/save/user',(req,res)=> {
    let email = req.body.email
    let senha = req.body.senha

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(senha,salt)

    User.findOne({where:{email: email}}).then((user)=> {
        console.log('user',user)
        if(user != undefined){
            res.redirect('/admin/login/novousuario')
        }else{
            User.create({
                email: email,
                password: hash
            }).then(()=>{
                res.redirect('/')
            })
        }
    })
})

router.get('/admin/edit/user/:id',(req,res)=> {
    let id = req.params.id
    User.findByPk(id).then((user)=>{
        if(user != undefined){
            res.render('admin/user/edit',{ user: user })
        }else{

        }
    })

})

router.post('/admin/edit/save',(req,res)=> {
    const { id, email, senha } = req.body
    /* let id = req.body.id
    let email = req.body.email
    let senha = req.body.senha */

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(senha,salt)
    /* console.log(id,email,hash)
    console.log(id,email,hash) */

    User.update({ email: email, password: hash},{
        where: { 
            id: id 
        }
    }).then(()=>{
        res.redirect('/admin/login')
    }).catch((err)=>{
        res.redirect('/admin/login')
    })

})


router.post('/admin/delete/user',(req,res)=> {
    const { id } = req.body

    console.log('id',id)

    User.destroy({
        where:{
            id: id
        }
    }).then(()=> {
        res.redirect('/admin/login')
    }).catch((err)=> {
        res.redirect('/admin/login')
    })
})

module.exports = router