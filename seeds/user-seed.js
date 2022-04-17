const {User} = require('../models')

const userSeeds = [
    {
        usermame: 'Dee123',
        email: 'Dee@123.com',
        Password: 'hello123'
    },

    {
        usermame: 'Kicks123',
        email: 'Kick@123.com',
        Password: 'hello123'
    },

    {
        usermame: 'Iamunique',
        email: 'Unique@123.com',
        Password: 'hello123'
    },
]


const seedData = () => User.bulkCreate(userSeeds)
module.exports = seedData