const Category = require("../models/category")
const Items = require('../models/items')
const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
    const[numItems, numCategories] = await Promise.all([
        Category.countDocuments({}).exec(),
        Items.countDocuments({}).exec(),
    ])
    res.render("index",{
        title:"Inventory App Home",
        item_count:numItems,
        category_count:numCategories
    })
  });

exports.category_list = asyncHandler(async(req,res,next)=>{
    const allCategories = await Category.find({})
    .sort({name:1})
    .exec();

    res.render("cat_list",{
        title:"Category List",
        cat_list:allCategories
    })
})
exports.category_detail = asyncHandler(async(req,res,next)=>{
    const [category,categoryItems] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Items.find({ category: req.params.id }, "name description").sort({ name: 1 }).exec(),
    ])

    if(category===null){
        const err = new Error("Category not found")
        err.status = 404;
        return next(err)
    }
    res.render("cat_detail",{
        title: "Category Detail",
        category: category,
        category_items: categoryItems,
    })

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