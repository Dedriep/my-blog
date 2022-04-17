const {Post} = require('../models')

const PostSeeds = [

    {
        title: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        post_content: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.",
        user_id: 1,
    },

    {
        title: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        post_content: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.",
        user_id: 2,
    },

    {
        title: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        post_content: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.",
        user_id: 1,
    },
    
    {
        title: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        post_content: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.",
        user_id: 1,
    },

    {
        title: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        post_content: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.",
        user_id: 2,
    },

    {
        title: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.  ",
        post_content: "Ipsum in officia nulla incididunt ad ipsum reprehenderit consequat reprehenderit dolore.",
        user_id: 3,
    }



]


const seedData = () => Post.bulkCreate(PostSeeds)
module.exports = seedData