const Users= require('../models/Users.model')
const getUserByname=async(req, res, next)=>{
    try{
        const users=await Users.findOne({username: req.params.username})
        if(!users){
            return res.status(404).json({});
        }
        return res.status(500).json(users);
    }
    catch(err){
        return res.status(404).json({
            success: false
        })
    }
}
const createuser= async(req, res, next)=>{
    try {
        const users=await Users.find({username:req.body.username})
        if(users){
            return res.status(400).json({
                "status":"failure",
                "reason":"explanation"
            })
        }
            const user=await Users.create({username: req.body.username})
            if(user){
                return res.status(201).json({
                    username: user.username
                })
            }
            else{
                return res.status(400).json({
                    "status":"failure",
                    "reason":"explanation"
                })
            }
    } catch (error) {
        return res.status(400).json({
            "status":"failure",
            "reason":"explanation"
        })
    }
}
module.exports={getUserByname,createuser}