import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000
import { signUpUser , loginUser ,getUserDetails, authmiddleware } from './controllers/userControllers.js'
import { userBlogs,indBlog } from './controllers/dashboardControllers.js'
import { createNewBlog ,getAllBlogs , getWritersBlogs } from './controllers/blogsController.js'
import { allTags,addOneTag } from './controllers/tagControllers.js'
import { getFollowerAndFollowingCount, getIsFollowing ,follow,unfollow} from './controllers/userControllers.js'
import { BlogsNoTags,BlogsWithTags } from './controllers/searchBlogsControllers.js'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));
const connection = await mysql.createConnection({
    uri: process.env.MYSQL_URI
})

/************** USER ROUTES *****************/ 
app.post('/users/signup', async (req, res) => {
    await signUpUser(connection, req, res)
})
app.post('/users/login', async (req, res) => {
    await loginUser(connection, req, res)
})
app.get('/users/authmiddleware', authmiddleware, (req, res) => {
    res.status(200).json({message : 'Authorized'})
})
app.get('/users/details', async (req, res) => {
    await getUserDetails(connection,req,res)
})
app.get('/users/socialstats', async (req,res) => {
    await getFollowerAndFollowingCount(connection , req , res)
})
app.get('/users/isfollowing', async (req,res) => {
    await getIsFollowing(connection,req,res);
})
app.post('/users/follow', async (req,res) => {
    await follow(connection,req,res)
})
app.post('/users/unfollow', async (req,res) => {
    await unfollow(connection,req,res)
})
/************** Dashboard *****************/
app.post('/dashboard', async (req,res)=>{
    await userBlogs(connection,req,res)
})
app.post('/dashboard/blog', async (req,res)=>{
    await indBlog(connection,req,res)
})
/**************** Writers  *********************/
app.get('/writers/blogs', async (req,res)=>{
    await getWritersBlogs(connection,req,res)
})

/************** tags *********************/
app.post('/alltags', async (req,res)=>{
    await allTags(connection,req,res)
})
app.post('/addtag', async (req,res)=>{
    await addOneTag(connection,req,res)
})

/********************* Blogs **********************/
app.post('/blog/newblog', async (req, res) => {
    await createNewBlog(connection, req, res)
})
app.get('/blog/allblogs', async (req, res) => {
    await getAllBlogs(connection, req, res)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

/****************Search*******************/
app.post('/noTags', async (req,res)=>{
    await BlogsNoTags(connection,req,res)
})
app.post('/withTags', async (req,res)=>{
    await BlogsWithTags(connection,req,res)
})