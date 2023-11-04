const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name:{type:String, minLength:1,maxLength:20, required:true},
    description:{type:String, minLength:4,maxLength:200, required:true},
    category:[{type:Schema.Types.ObjectId, ref:"category", required:true}],
    price:{type:Number, min:1,  required:true},
    stock:{type:Number, required:true},
    
})

itemSchema.virtual("url").get(function(){
    return `/catalog/item/${this._id}`
})

module.exports = mongoose.model("items",itemSchema)