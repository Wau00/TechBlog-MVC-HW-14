const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsto(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'posted_id',
    onDelete: 'CASCADE'
});

Comment.belongsto(Post, {
    foreignKey: 'posted_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post, Comment };