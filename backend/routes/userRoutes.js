import express from 'express';
import { signUpUser , loginUser ,getUserDetails, authmiddleware , follow , unfollow} from '../controllers/userControllers.js'
import { getFollowerAndFollowingCount , getIsFollowing} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/details', getUserDetails);
router.get('/socialstats', getFollowerAndFollowingCount);
router.get('/isfollowing', getIsFollowing);
router.post('/follow', follow);
router.post('/unfollow', unfollow);

export default router;

