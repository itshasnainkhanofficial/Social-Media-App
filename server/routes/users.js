import express from "express";
import {
  getAllUsers,
  getUser,
  getUserFriends,
  addRemoveFriend
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


// Get All Users
router.get("/get" , verifyToken , getAllUsers)

// Get Single User 
router.get("/:id", verifyToken , getUser )


// Get User Friends
router.get("/:id/friends", verifyToken , getUserFriends )


// Update
router.patch("/:id/:friendId", verifyToken , addRemoveFriend)
export default router;