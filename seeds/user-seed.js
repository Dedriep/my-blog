const {User} = require('../models')

const userSeeds = [
    {
        username: 'Dee123',
        email: 'Dee@123.com',
        password: 'hello123'
    },

    {
        username: 'Kicks123',
        email: 'Kick@123.com',
        password: 'hello123'
    },

    {
        username: 'Iamunique',
        email: 'Unique@123.com',
        password: 'hello123'
    },
]


const seedData = () => User.bulkCreate(userSeeds)
module.exports = seedData