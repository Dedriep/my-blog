const {Model, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

class Post extends Model {}

Post.init(
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKeey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        username: {
            type: DataTypes.INTEGER,
            refrences: {
                model: 'User',
                key: 'id',
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post'

    }
)

module.exports = Post