import { getBlogs,individualBlog } from "../sql/queries/dashboard1.js"; 
import { db } from "../db/db.js";

export async function userBlogs(req , res){
    const { user_id } = req.body
    try{
        const [rows , fields] = await getBlogs(db, user_id)
        res.status(200).json({rows : rows})

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}

export async function indBlog(req,res){
    const {blog_id} = req.body
    try{
        const [rows , fields] = await individualBlog(db, blog_id)
        res.status(200).json({rows : rows})

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }

}