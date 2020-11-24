const expresss = require('express');
const router = expresss.Router();
const Posts = require('../models/post')

router.get("/", async (req, res) => {
    let posts;
    try {
        posts = await Posts.find().sort({ createdAt: 'desc' }).limit(5).exec();
    } catch {
        posts = "Error has occured, please come back later due this bug!";
    }
    res.render("index", { posts: posts });
})
router.get("/login", (req, res) => {
    res.render('login/index', { errorMessage: '' })
})

router.post("/posts/new", (req, res) => {
    try {
        if (req.body.username == "Admin" && req.body.password == "FreeForPalestine") {
            res.render("post/new");
        } else {
            throw "Password or username is wrong!";
        }
    } catch (err) {
        res.render('login/index', { errorMessage: err })

    }
})


module.exports = router;