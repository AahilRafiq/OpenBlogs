import { Router } from "express";
import { getWritersBlogs } from "../controllers/blogsController";

const router = Router();

router.get('/blogs',getWritersBlogs)

export default router;