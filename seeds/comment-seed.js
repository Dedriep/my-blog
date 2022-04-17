const {Comment} = require('../models')

const commentSeeds = [

    {
        comment_text: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        user_id: 1,
        post_id: 2
    },

    {
        comment_text: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        user_id: 2,
        post_id: 2
    },

    {
        comment_text: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        user_id: 2,
        post_id: 1
    },

    {
        comment_text: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        user_id: 1,
        post_id: 1
    },

]

const seedData = () => Comment.bulkCreate(commentSeeds)
module.exports = seedData
