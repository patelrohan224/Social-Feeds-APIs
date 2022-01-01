const mongoose= require('mongoose')
const UserSchema = mongoose.Schema({
    username:{type: String, required: true},
    followers:[String],
    following:[String],
    posts:[
        {
            postId:Number,
            imageUrl:String,
            caption:String,
            upvotes:Number
        }
    ]
    
})
const Users=mongoose.model('user',UserSchema)
module.exports = Users

