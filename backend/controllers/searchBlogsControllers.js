import { blogsNoTags } from "../sql/queries/searchBlogs12.js";
import { blogsWithTags, tagsWithTags, blogsWithTagsAndFollowersSQL, blogsNoTagsWithFollowsSQL } from "../sql/queries/searchBlogs12.js";
import { db } from "../db/db.js";

export async function BlogsNoTags(req, res) {
    try {
        const [rows, fields] = await blogsNoTags(db);
        const rows12 = await tagsAdder(db, rows);
        res.status(200).json({ rows: rows12 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function BlogsWithTags(req, res) {
    const tags = req.body.tags1;
    try {
        const [rows, fields] = await blogsWithTags(db, tags);
        const rows12 = await tagsAdder(db, rows);
        res.status(200).json({ rows: rows12 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function tagsAdder(db, rows) {
    const result = [];
    for (const row of rows) {
        const [rows123, fields] = await tagsWithTags(db, row.id);
        const x = row;
        x.tags = rows123;
        result.push(x);
    }
    //console.log(result)
    return result;
}

// POST /withTagsAndFollows
export async function BlogsWithTagsAndFollowers(req, res) {
    const tags = req.body.tags1;
    const userId = req.body.userId;
    try {
        const [rows, fields] = await blogsWithTagsAndFollowersSQL(db, tags, userId);
        const rows12 = await tagsAdder(db, rows);
        res.status(200).json({ rows: rows12 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// POST /noTagsWithFollows
export async function BlogsNoTagsWithFollows(req, res) {
    const userId = req.body.userId;
    try {
        const [rows, fields] = await blogsNoTagsWithFollowsSQL(db, userId);
        const rows12 = await tagsAdder(db, rows);
        res.status(200).json({ rows: rows12 });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
