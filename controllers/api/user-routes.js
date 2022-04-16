const router = require('express').Router()
const sequelize = require('../../config/connection')
const {Comment, Post, User} = require('../../models')
// add auth

//get all users
router.get('/', (req,res) => {
    User.findAll({
        attributes: ['username'],
    })
.then(data => res.json(data))
.catch(err =>{
    console.log(error)
    res.status(500).json(err)
})
})

// get one user

router.get('/:id',(req,res)=> {
    User.findOne({
        attributes: {exclude: ['password'] },
        where: {id: req.params.id},
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'created_at'],
                include: {
                    mode: Post,
                    attributes: ['title']
                },
            },

            {
                model: Post,
                attributes: ['title', 'post_content', 'created_at']
            }
        ]}
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'no user found'})
                return               
            } res.json(data)
        })     
        .catch(err =>{
            console.log(error)
            res.status(500).json(err)
        })
    )})




module.exports = User