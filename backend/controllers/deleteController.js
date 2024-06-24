import { deleteBlog1,deleteBlog2,deleteBlog3,deleteBlog4 } from "../sql/queries/deleteBlog.js";
import { db } from "../db/db.js";

export async function DeleteBlog(req,res){
    const blog_id = req.body.blog_id
    try{
        await deleteBlog1(db,blog_id)
        await deleteBlog2(db,blog_id)
        await deleteBlog3(db,blog_id)
        await deleteBlog4(db,blog_id)
        res.status(200).json({result : "Done"})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }
}
