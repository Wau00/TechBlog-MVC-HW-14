const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComent = await Comment.create({
            content: req.body.content,
            posted_id: req.body.posted_id,
            user_id: req.session.user_id
        })

        res.status(200).json(newComent);
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