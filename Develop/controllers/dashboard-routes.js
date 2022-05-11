const router = require('express').Router()
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
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
        const post = postData.map((post) => post.get({ plain: true }));
        console.log(post)
        res.render('all-post-admin', { post, logged_in: true });
    } catch (err) {
        res.status(500).json(err);
        res.redirect('login')
    }
});
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['content', 'date_created', 'user_id', 'post_id']
                }
            ],
        });

        const post = postData.get({ plain: true });

        res.render('edit-post', { post, logged_in: true });
    } catch (err) {
        res.status(500).json(err);
        res.redirect('login');
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { layout: 'dashboard' });
});


module.exports = router;