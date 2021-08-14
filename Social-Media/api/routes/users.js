const router = require('express').Router();
const {encrypt , decrypt} = require('../utility/crypto');
const User = require('../models/user');

// Update user
router.put('/:id', async (req , res) => {
    const {password , userId} = req.body;
    if(userId === req.params.id || req.body.isAdmin) {
        if(password) {
            try {
                const hashPassword = encrypt(password);
                req.body.password = hashPassword;
            }
            catch(err) {
                return res.status(500).json(err);
            }
        }
        try{
            await User.findByIdAndUpdate(userId , {
                $set: req.body
            });
            res.status(200).json("Account has been updated");
        }
        catch(err) {
            return res.status(500).json("Internal server error");
        }
    } else {
        return res.status(401).json("You can update only your account");
    }
})
// delete user
router.delete('/:id', async (req , res) => {
    const {id: userId} = req.params
    if(userId === req.body.userId || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(userId);
            res.status(200).json("Account has been deleted successfully");
        }
        catch(err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(401).json("You can delete only your account");
    }
});

// get a user
router.get('/', async (req , res) => {
    const {userId: userId , userName: userName} = req.query;
    try {
        debugger;
        const user = userId ? await User.findById(userId) : await User.findOne({userName: userName});
        const {password , updatedAt, ...other } = user._doc;
        if(!user) {
            return res.status(404).json("not found");
        }
        return res.status(200).json(other);
    } catch(err) {
        return res.status(500).json(err);
    }
});

// follow a user
router.put("/:id/follow", async(req, res) => {
    const {id: targetUserId} = req.params;
    const {userId: currentUserId} = req.body;

    if(targetUserId !== currentUserId) {
        try {
            const targetUser = await User.findById(targetUserId);
            const currentUser = await User.findById(currentUserId);

            if(targetUser.followers.includes(currentUserId)) {
                res.status(200).json("You already follow this user")
            } else {
                await targetUser.updateOne({$push: {followers: currentUserId}});
                await currentUser.updateOne({$push: {following: targetUserId}});
                res.status(200).json("user has been followed");
            }
        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        res.status(403).json("You cant follow yourself");
    }
});

// unfollow a user
router.put("/:id/unfollow", async(req, res) => {
    const {id: targetUserId} = req.params;
    const {userId: currentUserId} = req.body;

    if(targetUserId !== currentUserId) {
        try {
            const targetUser = await User.findById(targetUserId);
            const currentUser = await User.findById(currentUserId);

            if(!targetUser.followers.includes(currentUserId)) {
                res.status(200).json("You cannot unfollow as you are not following this user")
            } else {
                await targetUser.updateOne({$pull: {followers: currentUserId}});
                await currentUser.updateOne({$pull: {following: targetUserId}});
                res.status(200).json("user has been unfollowed");
            }
        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        res.status(403).json("You cant unfollow yourself");
    }
});

module.exports = router;