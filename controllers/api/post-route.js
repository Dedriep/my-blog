
router.get('/', (req,res) => {
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['comment_text', 'created_at',]
            },
            {}

        ]
    })

})

module.exports = router