const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
   userId: {type: String, required: true},
   description:{type: String, max: 500},
   img: {type: String},
   likes: {
       type: Array, default: []
   },
   comments: {
       type: Array, default: []
   },
   createdAt: {
       type: Date
   },
   updatedAt: {
    type: Date
   }
},
{timeStamp: true});

module.exports = mongoose.model("Post", PostSchema);