const router = require('express').Router()
const { Post, User, Comment } = require('../models')

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
        .then(data => {
            const post = data.map(post => post.get({ plain: true }))
            res.render('homepage', { post })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })

})


//login page
router.get('/login', (req, res) => {

    if (req.session.loggedIn) {
        res.redirect('/')
        return;
    }
    res.render('login')
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }


})

router.get('/post/:id', (req,res) =>{
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
        .then(data => {
            if(!data){
                res.status(404).json({message:"no post found!"})
                return
            }
            const post = data.get({plain:true})
            res.render('singlepost',{post})
        })

        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
        

})

module.exports = router