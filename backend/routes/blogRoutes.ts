import { Router } from "express";
import { createNewBlog, getAllBlogs } from "../controllers/blogsController";
import { DeleteBlog } from "../controllers/deleteController";

const router = Router();

router.post("/newblog", createNewBlog);
router.get("/allblogs", getAllBlogs);
router.post("/deleteblog", DeleteBlog);

export default router;