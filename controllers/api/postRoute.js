const router = require("express").Router();

const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const posted = await Post.findAll({
            include: [{
                 model: Comment,
                    include: [{
                        model: User,
                    }
                ]                         
                }
            ],
    })
    const posts = posted.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const posted = await Post.findByPk(req.params.id, {
            include: [{
                model: Comment,
                include: [{
                    model: User,
                }]
            }]
        })
        const posts = posted.get({ plain: true });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);

    }
});

router.post("/", async (req, res) => {
    try {
        const posted = await Post.create({
            title: req.body.title,
            contents: req.body.contents,
            user_id: req.session.user_id,
        });
        res.status(200).json(posted);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

router.put("/:id", async (req, res) => {
    try {
        const posted = await Post.update({
            title: req.body.title,
            contents: req.body.contents,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        res.status(200).json(posted);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const posted = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(posted);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;

