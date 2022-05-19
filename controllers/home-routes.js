const router = require('express').Router()
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: User,
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('all-post', { layout: 'main', posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ]
        });
        if (postData) {
            const post = postData.get({ plain: true });
            console.log(post);
            res.render('single-post', { layout: 'main', post, logged_in: req.session.logged_in });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect(`/dashboard`);
        } else {
            res.render(`login`);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/signup', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect(`/dashboard`);
        } else {
            res.render(`signup`);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;