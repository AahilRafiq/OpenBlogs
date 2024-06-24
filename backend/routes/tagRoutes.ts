import { Router } from "express";
import { allTags, addOneTag } from "../controllers/tagControllers.js";

const router = Router();

router.post("/alltags", allTags);
router.post("/addtag", addOneTag);

export default router;

