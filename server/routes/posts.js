import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { userFeedPosts } from "../controllers/posts.js";
const router = express.Router();


// Get All Posts
router.get("/get" , verifyToken , userFeedPosts)

export default router;