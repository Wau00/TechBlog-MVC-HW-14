const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }

    res.render('single-post');
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const postInfo = await Post.update({
            where: {
                id: req.params.id,
            },
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id,
        });
        if (!postInfo) {
            res.status(404).json({ message: 'No post Found' });
            return;
        }
        res.status(200).json(postInfo);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postInfo = await Project.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postInfo) {
            res.status(404).json({ message: 'No project Found' });
            return;
        }

        res.status(200).json(postInfo);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;