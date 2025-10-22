import express from "express";
import {
  getPosts,
  getPost,
  updatePost,
  createPost,
  deletePost,
} from "../controllers/postController.js";
const router = express.Router();

// middleware
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

// Routes, takes two arguments, the first one is just the route endpointand the second is a function that takes in the req, res methods.
// req headers, body etc, res, has a bunch of methods you can use
// any extra argument in routes is the middleware

// Get all posts
// query strings like for e.g http://localhost:8000/api/posts?limit=2
router.get("/", /*logger,*/ getPosts);

// Get single post
router.get("/:id", getPost);

// Create new post
router.post("/", createPost);

// Update Post
router.put("/:id", updatePost);

// Delete Post
router.delete("/:id", deletePost);

export default router;
