const Post = require("../models/post-model");

exports.getAllPosts = async(req, res, next) => {
    try {
        const posts = await Post.find();

        res.status(200).json({
            status: 'success',
            count: posts.length,
            data: {
                posts
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e
        });
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const posts = await Post.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e
        });
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const posts = await Post.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e
        });
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e
        });
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e
        });
    }
}