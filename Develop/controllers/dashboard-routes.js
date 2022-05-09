const router = require('express').Router()
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['content', 'date_created', 'user_id', 'posted_id']
                }
            ],
        });
        const post = postData.map((post) => post.get({ plain: true }));
        res.render('all-post-admin', { post, logged_in: true });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get('/edit/:id', async (req, res) => {
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
    }
});


module.exports = router;