const router = require('express').Router()
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { 'user_id': req.session.user_id },
            include: User
        });
        const posts = postData.map((burger) => burger.get({ plain: true }));
        console.log(posts);
        res.render('all-post-admin', { layout: 'dashboard', posts, });
    } catch (err) {
        res.redirect('login');
    }
});


// router.get('/edit/:id', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findOne({
//             where: { id: req.params.id },
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name'],
//                 },
//                 {
//                     model: Comment,
//                     attributes: ['content', 'date_created', 'user_id', 'post_id']
//                 }
//             ],
//         });

//         const post = postData.get({ plain: true });

//         res.render('edit-post', { post, logged_in: true });
//     } catch (err) {
//         res.status(500).json(err);
//         res.redirect('login');
//     }
// });

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'title',
            'content',
            'date_created'
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'content', 'posted_id', 'user_id', 'date_created'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const posts = dbPostData.get({ plain: true });
            res.render('edit-post', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { layout: 'dashboard' });
});


module.exports = router;