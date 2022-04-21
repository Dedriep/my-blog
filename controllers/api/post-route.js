const router = require('express').Router()
const sequelize = require('../../config/connection')
const { Comment, Post, User } = require('../../models')
const withAuth = require('../../utils/auth')



//get all posts
//route works need to addd created at
router.get('/', (req, res) => {
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
        .then(data => res.json(data))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

//find one post
//route works

router.get('/:id', (req, res) => {

    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', ],
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
        .then(data => res.json(data))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

//create a post

router.post('/', (req, res) => {

    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })

})


//update a post
//route works

router.post('/:id', (req, res) => {

    Post.update({
        title: req.body.title,
        post_content: req.body.post_content,
    },
        {
            where: { id: req.params.id }
        })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'no post found' })
                return
            } res.json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })

})


//delete a post
// route works

router.delete('/:id', (req,res) =>{

    Post.destroy({
            where: {id:req.params.id}
        })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'no post found' })
                return
            } res.json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


module.exports = router