import { Router } from "express";
import { checkVote,upvote,downvote,getVotes,undownvote,unupvote } from '../controllers/votescontroller.js'

const router = Router();

router.get('/checkvote', checkVote)
router.post('/upvote', upvote)
router.post('/downvote', downvote)
router.get('/votecount', getVotes)
router.post('/unupvote', unupvote)
router.post('/undownvote', undownvote)

export default router;