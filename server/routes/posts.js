import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { userFeedPosts, getUserPosts } from "../controllers/posts.js";
const router = express.Router();


// Get All Posts
router.get("/get" , verifyToken , userFeedPosts)

// get User Post
router.get("/:userId" , verifyToken , getUserPosts)

export default router;