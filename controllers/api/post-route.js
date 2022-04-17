const router = require('express').Router()
const sequelize = require('../../config/connection')
const { Comment, Post, User } = require('../../models')


//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'created_at', 'post_content'],
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

//find one post

router.get('/:id', (req, res) => {

    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'post_url', 'title', 'created_at'],
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
            console.log(error)
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
            console.log(error)
            res.status(500).json(err)
        })

})


//update a post

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
            console.log(error)
            res.status(500).json(err)
        })

})


//delete a post

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
            console.log(error)
            res.status(500).json(err)
        })
})


module.exports = router