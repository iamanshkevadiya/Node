const { Router } = require('express');
const { getCommentByProductId, createComment, updateComment, deleteComment } = require('../controller/comment.controller');
const decode = require('../middleware/decodeJwt');

const commentRouter = Router();

commentRouter.get("/:productId", getCommentByProductId);
commentRouter.post("/", decode, createComment);
commentRouter.patch("/:commentId", decode, updateComment);
commentRouter.delete("/:commentId", decode, deleteComment);

module.exports = { commentRouter };