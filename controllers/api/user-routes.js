const router = require('express').Router()
const sequelize = require('../../config/connection')
const {Comment, Post, User} = require('../../models')
const withAuth = require('../../utils/auth')

// add auth

//get all users
//route works
router.get('/', (req,res) => {
    User.findAll({
        attributes: {exclude: ['password'] },
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
                attributes: ['comment_text',],
                include: {
                    mode: Post,
                    attributes: ['title']
                },
            },

            {
                model: Post,
                attributes: ['title', 'post_content']
            }
        ]
    })
    .then(data => {
        if (!data) {
            res.status(404).json({message: 'no user found'})
            return;            
        } 
        res.json(data)
    })     
    .catch(error =>{
        console.log(error)
        res.status(500).json(error)
    })
})

// create a user - route works
router.post('/', (req,res)=>{
    User.create({
        username: req.body.username,
        email: req.body.email, //change to session
        password: req.body.password
    })
    .then(data => {
        req.session.save(() => {
            req.session.user_id = data.id
            req.session.username = data.username
            req.session.loggedIn = true
        })
        res.json(data)
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json(error)
    })
    })

    
    //login route -post


    //logout route 
    router.post('/logout', (req,res) => {

if (req.session.loggedIn) {
    req.session.destroy(()=>{
        res.status(204).end()
    }

    )}
    else {
        res.status(404).end()
    }
    })


//delete user - route works
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).json({message: 'no user found'})
            return               
        } res.json(data)
    })     
    .catch(error =>{
        console.log(error)
        res.status(500).json(error)
    })
}
)

module.exports = router