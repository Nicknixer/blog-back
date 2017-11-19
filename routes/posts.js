const Post = require('../models/Post');

module.exports = function(app) {
    // Получение всех
    app.get('/api/posts', async (req, res) => {
        let posts = await Post.find((error, postEntries) => {
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            return postEntries;
        });

        res.json({
            success: true,
            posts: posts
        });
    });

        // Добавление
    app.post('/api/posts', async (req, res) => {
        let post = req.body;

console.log(post);
        let postRecord = new Post(post);

        let result = await postRecord.save(function (error) {
            if (error) {
                return {
                    success: false,
                    msg: error
                };
            }

            return {
                msg: "Post has been saved",
                success: true
            }
        });

        res.json(result);
    });

    // Получение одного
    app.get('/api/posts/:id', async (req, res) => {
        let post = await Post.findById(req.params.id, (error, post) => {
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            return post;
        });

        if (Object.keys(post).length == 0) {
            res.json({
                success: false,
                msg: "Not found"
            });
        }

        res.json({
            success: true,
            post: post
        });
    });

    // УДаление
    app.delete('/api/posts/:id', async (req, res) => {
        let post = await Post.findByIdAndRemove(req.params.id, (error, post) => {
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            res.json({
                success: true,
                msg: "Post has been deleted"
            });
        });
    });

    // Изменение юзера
    app.put('/api/posts/:id', async (req, res) => {
        let post = req.body;
        console.log(post);

        let postEntry = await Post.findById(req.params.id, (error, entry) => {
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            return entry;
        });

        if (postEntry == null) {
            res.json({
                success: false,
                msg: "Not found"
            });
        }

        postEntry.title = post.title;
        postEntry.author = post.author;
        postEntry.body = post.body;
        postEntry.updatedAt = new Date().now;

        await postEntry.save(error=>{
            if (error) {
                res.json({
                    success: false,
                    msg: error
                });
            }

            res.json({
                msg: "Post has been updated",
                success: true
            });
        });
    });
    
};
