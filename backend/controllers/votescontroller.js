import { checkDownvoteSQL, checkUpvoteSQL, upvoteSQL, downvoteSQL, getDownvotesSQL, getUpvotesSQL, unupvoteSQL, undownvoteSQL } from "../sql/queries/votes.js";
import { db } from "../db/db.js";

// GET /votes/checkvote
export async function checkVote(req, res) {
    const { user_id, blog_id } = req.query;
    try {
        const [rows, fields] = await checkDownvoteSQL(db, user_id, blog_id);
        const [rows2, fields2] = await checkUpvoteSQL(db, user_id, blog_id);
        res.status(200).json({ checkdownvote: rows[0].checkdownvote, checkupvote: rows2[0].checkupvote });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// POST /votes/upvote
export async function upvote(req, res) {
    const { user_id, blog_id } = req.body;
    try {
        await upvoteSQL(db, user_id, blog_id);
        res.status(200).json({ message: 'Upvoted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// POST /votes/downvote
export async function downvote(req, res) {
    const { user_id, blog_id } = req.body;
    try {
        await downvoteSQL(db, user_id, blog_id);
        res.status(200).json({ message: 'Downvoted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// GET /votes/votecount
export async function getVotes(req, res) {
    const { blog_id } = req.query;
    try {
        const [rows, fields] = await getUpvotesSQL(db, blog_id);
        const [rows2, fields2] = await getDownvotesSQL(db, blog_id);
        res.status(200).json({ upvotes: rows[0].upvotes, downvotes: rows2[0].downvotes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// POST /votes/unupvote
export async function unupvote(req, res) {
    const { user_id, blog_id } = req.body;
    try {
        await unupvoteSQL(db, user_id, blog_id);
        res.status(200).json({ message: 'Unupvoted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// POST /votes/undownvote
export async function undownvote(req, res) {
    const { user_id, blog_id } = req.body;
    try {
        await undownvoteSQL(db, user_id, blog_id);
        res.status(200).json({ message: 'Undownvoted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
