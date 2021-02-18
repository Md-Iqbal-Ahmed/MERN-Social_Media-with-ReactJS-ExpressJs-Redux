import express from "express";
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  likePost,
} from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPost);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.get("/:id", getSinglePost);

router.patch("/:id/like", auth, likePost);

export default router;
