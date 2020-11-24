const express = require('express');
const { route } = require('.');
const Post = require('../models/post');
const router = express.Router();
const marked = require("marked");

router.get("/", async (req, res) => {
    if ("id" in req.query) {
        getPost(req, res, req.query.id.trim());

    } else {
        let posts;
        let errorMessage = '';
        try {
            posts = await Post.find()
        } catch (err) {
            console.log(err)
            posts = "error has occured";
            errorMessage = "error has occured";
        }
        res.render("posts/index", { posts: posts, errorMessage });
    }

})

async function getPost(req, res, id) {
    try {
        const post = await Post.findById(id);
        res.render('post/post', { post: post })
    } catch {
        res.redirect('/')
    }

}

router.get("/new", (req, res) => {
    res.redirect("/login");
})


router.post('/', async (req, res) => {
    let html = marked(req.body.content)
    const post = new Post({
        title: req.body.title,
        author: req.body.author,
        content: html,
    });
    const posts = await Post.find();
    console.log("ini semua posts", posts)
    try {
        const newPost = await post.save();
        res.redirect("posts")
    } catch (err) {
        console.log(err)
        res.redirect("/")
    }
})

module.exports = router