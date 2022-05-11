const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [User],
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        console.log(comments);
        res.render('single-post', { comments, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});



router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            posted_id: req.body.posted_id,
            user_id: req.session.user_id
        })

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }

});


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentInfo = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentInfo) {
            res.status(404).json({ message: 'No comment Found' });
            return;
        }

        res.status(200).json(commentInfo);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;