const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
    try {
        const postInfo = await Project.update({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id,
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
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

router.delete('/:id', async (req, res) => {
    try {
        const postInfo = await Project.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
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