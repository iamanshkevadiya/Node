const Comment = require("../models/comment.model");

const getCommentByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        let comment = await Comment.find({ product: productId });
        res.status(200).send(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const createComment = async (req, res) => {
    try {
        req.body.user = req.user.id;
        let comment = await Comment.create(req.body);
        res.status(201).send(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateComment = async (req, res) => {
    let { commentId } = req.params;
    try {
        let comment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
        res.send(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteComment = async (req, res) => {
    let { commentId } = req.params;
    try {
        let comment = await Comment.findByIdAndDelete(commentId);
        res.send(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getCommentByProductId,
    createComment,
    updateComment,
    deleteComment,
};