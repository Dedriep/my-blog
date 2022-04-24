const {Model, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')


class User extends Model {
    // password hashing w/ bcrypt

    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password)
    }
}

User.init (
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail:true
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
       

    },

    {
        hooks: {
           async beforeCreate(newData){
                newData.password =await bcrypt.hash(newData.password,10)
                return newData
            },

            async beforeUpdate(updatedData){
                updatedData.password = await bcrypt.hash(updatedData.password, 10)
                    return updatedData
                
            }
        },


        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'User'
    }
)

module.exports = User