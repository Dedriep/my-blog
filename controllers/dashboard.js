const router = require('express').Router()
const {Comment, User, Post} = require('../models')
//const withAuth = require('../utils')

router.get('/',(req, res) => {
    Post.findAll({
        where: {user_id: req.session.user_id},
        attributes: ['id', 'title', 'post_content'],
        include: [
            {
                model: Comment,
                attributes: ['comment_text',],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        const post = data.map(post => post.get({ plain: true }))
        res.render('dashboard', { post, loggedIn:true })
    })      .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })

})


router.get('/edit/:id', (req,res) => {
    Post.findByPk(req.params.id,{
        attributes: ['id', 'title','post_content' ],
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'created_at',],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(data => {
            if(!data){
                res.status(404).json({message:"no post found!"})
                return
            }
            const post = data.get({plain:true})
            res.render('edit-post',{post, loggedIn:true})
        })

    })

module.exports = router