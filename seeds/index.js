const userSeeds = require('./user-seed')
const postSeeds = require('./post-seed')
const commentSeeds = require ('./comment-seed')

const sequelize = require('../config/connection')

const seeded = async () => {
    await sequelize.sync({force: true})

    await userSeeds ()
    await postSeeds()
    await commentSeeds()

    process.exit(0)
}

seeded()