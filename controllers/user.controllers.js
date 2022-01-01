const Users= require('../models/Users.model')
const nanoid=require('nanoid')
const getUserByname=async(req, res, next)=>{
    console.log(req.params);
    try{
        const users=await Users.findOne({username: req.params.username})
        if(!users){
            return res.status(404).json({});
        }
        console.log(users);
        return res.status(200).json(users);
    }
    catch(err){
        return res.status(404).json({
            success: false
        })
    }
}
const createuser= async(req, res, next)=>{
    console.log(req.body.username);
    // console.log("here in post ")
    const temp=await Users.findOne({username:req.body.username});

    if(temp)
    {
        return res.status(400).json({
            status:"failure",
            reason:"user already exist"
        })
    }
    const data=await Users.create(req.body);
    if(data)
    {
        // console.log("data added");
        return res.status(201).json({"username":data.username});
    }
    else
    {
         return res.status(400).json({
            status:"failure",
            reason:"something went wrong"
        })
    }

}
const follw= async(req, res, next)=>{
    const a=await Users.findOne({username:req.params.usernameA});
    const b=await Users.findOne({username:req.params.usernameB});

   
    if(a && b){
        const d=await Users.findByIdAndUpdate(b._id,{ $push: {followers:a.username}})
        const e=await Users.findByIdAndUpdate(a._id,{ $push: {following:b.username}})
        return res.status(202).json({"status": "success"})
    }
    
return res.status(400).json({status:"failure",reason:"user already exist"})
}

const posst=async(req, res, next)=>{
    const a=await Users.findOne({username:req.params.username})
    if(a){
        const d=await Users.findByIdAndUpdate(a._id,
            { $push: 
                {posts:
                    {imageUrl:req.body.imageUrl,caption:req.body.caption,postId:Math.floor(Math.random() * 10),upvotes:0}
                }
            },{new:true}
            )
        if(d.posts.length>1){
            return res.status(201).json(d.posts[d.posts.length-1])            
        }
        return res.status(201).json(d.posts[0])
    }
        
return res.status(400).json({status:"failure",reason:"user already exist"})


}

const newrew=async(req, res, next)=>{
    const a=await Users.findOne({username:req.params.usernameA})
  
    const posts=[]
    if(a){
        const foll=a.following
        console.log(foll[0]);
        for (let i = 0; i < foll.length; i++) {
            const user=await Users.findOne({username:foll[i]})
            console.log(user);
            if(user.posts.length>1){
                for (let j = 0; j < user.posts.length; j++) {
                    const postUser = user.posts[j]
                        posts.push(postUser)        
                }
            }else{
                posts.push(user.posts[0])
            }
        }
        if(posts.length==0){
            return res.status(200).json([])
        }
        return res.status(200).json(posts)
    }
    return res.status(400).json({status:"failure",reason:"user already exist"})
}
module.exports={getUserByname,createuser,follw,posst,newrew}