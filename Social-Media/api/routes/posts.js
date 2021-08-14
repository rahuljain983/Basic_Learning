const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');

// Get All Posts of following users / timeline
router.get('/timeline/:userId', async (req, res) => {
    const { userId: currentUserId } = req.params;
    let postArray = [];
    try {
        const currentUserPosts = await Post.find({ userId: currentUserId });
        const currentUser = await User.findById(currentUserId);
        const freindPosts = await Promise.all(currentUser.following.map((friendId) => {
            return Post.find({ userId: friendId });
        }));

        postArray = [...currentUserPosts, ...freindPosts];

        // for (let i = 0; i < currentUser.following.length; i++) {
        //     const resp = await Post.findById(currentUser.followers[i]);
        //     postArray.push(resp);
        // }   
        res.header("Access-Control-Allow-Origin", "*");
        return res.status(200).json(postArray);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// get users all posts
router.get('/profile/:userName', async (req, res) => {
    const { userName: currentUserName } = req.params;
    try {
        const currentUser = await User.findOne({ userName: currentUserName });
        const currentUserPosts = await Post.find({ userId: currentUser._id });
        res.header("Access-Control-Allow-Origin", "*");
        return res.status(200).json(currentUserPosts);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
});


// create a post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// Update a post
router.put('/:id', async (req, res) => {
    // Check this request is being send by the owner of the post
    try {
        const { id: postId } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(postId);
        if (post.userId === userId) {
            // await Post.findByIdAndUpdate(postId, {
            //         $set: req.body
            // })
            await post.updateOne({
                $set: req.body
            })
            res.status(200).json("Post has been updated");
        }
        else {
            return res.status(403).json("you can update only your posts.")
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

// Delete a post
router.delete('/:id', async (req, res) => {
    const { id: postId } = req.params;
    const { userId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (post.userId === userId) {
            // await Post.findByIdAndDelete(postId);
            await post.deleteOne();
            return res.status(200).json("Post has been deleted.")
        } else {
            return res.status(403).json("You can delete only your posts.")
        }

    } catch (err) {
        return res.status(500).json(err);
    }
})

// Like/dislike a post
router.put('/:id/like', async (req, res) => {
    const { id: postId } = req.params;
    const { userId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            return res.status(200).json("Post has been liked.")
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            return res.status(200).json("Post has been disliked.")
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;