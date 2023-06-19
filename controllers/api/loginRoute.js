const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const userCheck = await User.findOne({
            where: {
                user_name: req.body.user_name,
            },
        });
        if (!userCheck) {
            res.status(400).json({ message: "No user account found!" });
            return;
        }
        const passwordCheck = await userCheck.checkPassword(req.body.password);
        if (!passwordCheck) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userCheck.id;
            req.session.logged_in = true;
            res.json({ user: userCheck, message: "You are now logged in!" });
        }
        );
    } catch (err) {
        res.status(400).json(err);

    }
});

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        }
        );
    } else {
        res.status(404).end();
    }
}
);

module.exports = router;