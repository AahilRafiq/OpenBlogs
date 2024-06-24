import { createNewUserSQL, getUserSQL , getUserDetailsSQL, isfollowingSQL,getFollowerCountSQL, getFollowingCountSQL, followSQL, unfollowSQL } from "../sql/queries/user.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { db } from "../db/db.js";

// POST /users/signup
export async function signUpUser(req, res) {
    const { username, password } = req.body
    try {
        const [rows, fields] = await getUserSQL(db, username)
        if (rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' })
        }
        await createNewUserSQL(db, username, password)
        const [rows2, fields2] = await getUserSQL(db, username, password)
        const userinfo = rows2[0]
        const tokenpayload = {
            id: userinfo.id,
            username: userinfo.username
        }
        const token = jwt.sign(tokenpayload, process.env.JWT_SECRET, { expiresIn: '10d' })
        res.status(200).json({ token: token, id: userinfo.id, username: userinfo.username })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


// POST /users/login
export async function loginUser(req, res) {
    const { username, password } = req.body
    try {
        const [rows, fields] = await getUserSQL(db, username, password)
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const userinfo = rows[0]
        const tokenpayload = {
            id: userinfo.id,
            username: userinfo.username
        }
        const token = jwt.sign(tokenpayload, process.env.JWT_SECRET, { expiresIn: '10d' })
        res.status(200).json({ token: token, id: userinfo.id, username: userinfo.username })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// GET /users/details
export async function getUserDetails(req, res) {
    try {
        const userId = req.query.userId
        const [rows, fields] = await getUserDetailsSQL(db, userId)
        res.status(200).json({ userdetails: rows })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// GET /users/socialstats
export async function getFollowerAndFollowingCount(req, res) {
    try {
        const userId = req.query.userId
        const [rows1 , fields1] = await getFollowerCountSQL(db , userId)
        const [rows2 , fields2] = await getFollowingCountSQL(db , userId)
        const {follower_count} = rows1[0]
        const {following_count} = rows2[0]
        res.status(200).json({follower_count,following_count})
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// GET /users/isfollowing
export async function getIsFollowing(req, res) {
    try {
        const {userId , follower_id} = req.query
        const [rows,fields] = await isfollowingSQL(db,userId,follower_id)
        const {isFollowing } = rows[0]
        res.status(200).json({isFollowing})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// POST /users/follow
export async function follow(req, res) {
    try {
        const {userId , follower_id} = req.body
        await followSQL(db,userId,follower_id)
        res.status(200).json({message : 'Followed'})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// POST /users/unfollow
export async function unfollow(req, res) {
    try {
        const {userId , follower_id} = req.body
        await unfollowSQL(db,userId,follower_id)
        res.status(200).json({message : 'Unfollowed'})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// Middleware to check if user is authenticated
export async function authmiddleware(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}
