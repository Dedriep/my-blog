const router = require('express').Router()
const {Post, Comment, User} = require('../../models')
const withAuth = require('../../utils/auth')


//view all comments - working
router.get('/', (req, res) => {
    Comment.findAll ()
    .then(data => res.json(data))
.catch(err =>{
    console.log(error)
    res.status(500).json(err)
})
   
})

//create a comment - working

router.post('/', (req,res) =>{

Comment.create(
    {
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
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

router.delete('/', withAuth, (req,res) => {

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