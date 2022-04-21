const router = require('express').Router()
const {Post, User, Comment} = require('../models')

router.get('/',(req,res) => {

    Post.findAll({
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
        const post= data.map(post => post.get({plain:true}))
        res.render('homepage',{post} ,data[1].get({plain:true}))
           })
           .catch(err =>{
            console.log(err)
            res.status(500).json(err)
        })

})

module.exports = router