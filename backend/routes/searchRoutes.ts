import { BlogsNoTags,BlogsWithTags,BlogsWithTagsAndFollowers,BlogsNoTagsWithFollows } from '../controllers/searchBlogsControllers.js'
import { NewBlog } from '../controllers/newBlogController.js'
import { Router } from 'express'

const router = Router()

router.post('/noTags' , BlogsNoTags)
router.post('/withTags' , BlogsWithTags)
router.post('/NewBlog' , NewBlog)
router.post('/withTagsAndFollows' , BlogsWithTagsAndFollowers)
router.post('/noTagsWithFollows' , BlogsNoTagsWithFollows)

export default router