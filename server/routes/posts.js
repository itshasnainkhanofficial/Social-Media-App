import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createPost } from "../controllers/posts.js";
const router = express.Router();


// Get All Users
// router.get("/get" , verifyToken , createPost)

export default router;