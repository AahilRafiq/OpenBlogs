import express from 'express'
import { userBlogs , indBlog } from '../controllers/dashboardControllers'

const router = express.Router()

router.post('/', userBlogs)
router.post('/blog', indBlog)

export default router