import { db } from "../db/db.js";

import { getAllTags,addTag,getTag} from "../sql/queries/tags1.js";

export async function allTags(req,res){
    try{
        const [rows , fields] = await getAllTags(db)
        res.status(200).json({rows : rows})

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }

}

export async function addOneTag(req,res){
    const {tag_name} = req.body
    try{
        await addTag(db,tag_name)
        const [rows , fields] = await getTag(db,tag_name)
        res.status(200).json({rows : rows})
    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'})
    }

}