const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'posted_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'posted_id'
});

module.exports = { User, Post, Comment };