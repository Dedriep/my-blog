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

// create a user
router.post('/', (req,res)=>{
    User.create({
        username: req.body.username,
        email: req.session.emial,
        password: req.body,password
    }
    .then(data => {
        req.session.save(() => {
            req.session.user_id = data.id
            req.session.username = data.username
            req.session.loggedIn = true
        })
        res.json(data)
    })
    .catch(err =>{
        console.log(error)
        res.status(500).json(err)
    })
    )})

    
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


//delete user
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
    .catch(err =>{
        console.log(error)
        res.status(500).json(err)
    })
}
)

module.exports = router