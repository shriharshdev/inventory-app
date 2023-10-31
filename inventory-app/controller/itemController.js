const Item = require("../models/items")
const asyncHandler = require("express-async-handler")

exports.item_list = asyncHandler(async(req,res,next)=>{

    const allItems = await Item.find({},"name stock price")
    .sort({price: 1})
    .populate("category")
    .exec();

    res.render("item_list",{
        title:"Items list",
        item_list:allItems
    })
})
exports.item_detail = asyncHandler(async(req,res,next)=>{
    const item = await Item.findById(req.params.id).populate("category").exec()

    if(item===null){
        const err = new Error("Item not found")
        err.status = 404;
        return next(err)
    }
    res.render("item_detail",{
        title:item.title,
        item:item,
    })
    console.log(item)
})
exports.item_create_get = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: Items create GET")
})
exports.item_create_post = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: Items create POST")
})
exports.item_delete_get = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: Items delete GET")
})
exports.item_delete_post = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: Items create POST")
})
exports.item_update_get = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: Items update GET")
})
exports.item_update_post = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: Items update POST")
})