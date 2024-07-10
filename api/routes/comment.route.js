import express from 'express';
import { createComment, deleteComment, editComment, getPostComments, likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create' , verifyToken , createComment);
router.get('/getPostComments/:postId' , getPostComments);
router.put('/likeComment/:commentId' , verifyToken , likeComment);                  // api to check whether a person has liked the post earlier or not , if not increase the like otherwise no
router.put('/editComment/:commentId' , verifyToken , editComment);
router.delete('/deleteComment/:commentId' , verifyToken , deleteComment);

export default router;
