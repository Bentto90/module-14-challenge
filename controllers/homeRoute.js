const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const auth = require('../utils/auth'); 

router.get("/", async (req, res) => {
    try {
        const posted = await Post.findAll({
            include: [{ model: User }],
        });
        const posts = posted.map((post) => post.get({ plain: true }));
        res.render("home", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);

    }
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
}
);

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("signup");
}
);

router.get("/post/:id", async (req, res) => {
    try {
        const posted = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    model: Comment,
                    include: [{ model: User,
                    attributes: ["user_name"],
                },],
            },
        ],
    });
    const singlePost = posted.get({ plain: true });

    res.render("post", {
        ...singlePost,
        logged_in: req.session.logged_in,
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;