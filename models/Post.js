const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: String,
    author: String,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    body: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
