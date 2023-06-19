const router = require("express").Router();
const { Comment } = require("../../models");

router.get("/:id", async (req, res) => {
    try {
        const messageData = await Comment.findAll({
            ...req.body,
                post_id: req.params.id,
                user_id: req.session.user_id,
            });
            res.status(200).json(messageData);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    
    module.exports = router;    

    