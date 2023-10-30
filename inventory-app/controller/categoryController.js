const Category = require("../models/category")
const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
  });

exports.category_list = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: category list")
})
exports.category_detail = asyncHandler(async(req,res,next)=>{
    res.send(`NOT IMPLEMENTED: category detail: ${req.params.id}`)
})
exports.category_create_get = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: category create GET")
})
exports.category_create_post = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: category create POST")
})
exports.category_delete_get = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: category delete GET")
})
exports.category_delete_post= asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: category create POST")
})
exports.category_update_get = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: category update GET")
})
exports.category_update_post = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: category update POST")
})