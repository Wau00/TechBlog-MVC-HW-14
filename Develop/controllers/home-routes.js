const router = require('express').Router()
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {

        const postData = await Post.findAll({
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


        const post = postData.map((post) => post.get({ plain: true }));


        res.render('all-post', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/post/:id', async (req, res) => {
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

        const post = postData.map((post) => post.get({ plain: true }));

        res.render('all-post', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;