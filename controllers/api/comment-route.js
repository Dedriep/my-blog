const router = require('express').Router
const {Post, Comment, Users, User} = require('../../models')

router.get('/', (req, res) => {

    Comment.findAll ()
    
    .then(data => res.json(data))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

//create a comment

router.post('/', (req,res) =>{

Comment.create(
    {
        comment_text: req.body.comment_text,
        user_id: req.session.ser_id,
        post_id: req.body.post_id
    }
)
.then(data => res.json(data))
.catch(err => {
    console.log(err)
    res.status(500).json(err)
})

})


//delete comment

router.delete('/', (req,res) => {

    Comment.destroy({
        where: {id: req.params.id}
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'no comment found' })
            return
        } res.json(data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })

})

module.exports = router