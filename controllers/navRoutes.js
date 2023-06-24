const router = require("express").Router();
const { Post } = require('../models')

router.get("/", (req, res) => {
  Post.findAll().then(function (postsData) {
    const posts = postsData.map(function (post) {
      return post.get({ plain: true });
    });
    res.render("home", { posts });
  });
});

module.exports = router;
