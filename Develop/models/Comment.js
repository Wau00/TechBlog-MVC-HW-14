const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { init } = require('./User');

class Comment extends Model {}

Comment.init(
    {
        id: {

        },
        title
    }

)