const Item = require("../models/items")
const asyncHandler = require("express-async-handler")

exports.item_list = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: Items list")
})
exports.item_detail = asyncHandler(async(req,res,next)=>{
    res.send(`NOT IMPLEMENTED: Items detail: ${req.params.id}`)
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