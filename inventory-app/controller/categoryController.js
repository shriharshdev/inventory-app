const Category = require("../models/category")
const Items = require('../models/items')
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
    const[numCategories, numItems] = await Promise.all([
        Category.countDocuments({}).exec(),
        Items.countDocuments({}).exec(),
    ])
    res.render("index",{
        title:"Inventory App Home",
        category_count:numCategories,
        item_count:numItems,
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
        title: category.name,
        category: category,
        category_items: categoryItems,
    })

})
exports.category_create_get = asyncHandler(async(req,res,next)=>{
    res.render("cat_form",{
        title:"Create Category"
    })
})
exports.category_create_post = [
    body("name", "Category name required").trim().escape().isLength({ min: 1 }),
    body("description", "Description required").trim().escape().isLength({ min: 1 }),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req)

        const category = new Category({
            name : req.body.name,
            description : req.body.description,
        })
        if(!errors.isEmpty()){
            res.render("cat_form", {
                title: "Create Category",
                category: category,
                errors: errors.array(),
              });
              return;
        } else {
            const catExists = await Category.findOne({name:req.params.id}).collation({ locale: "en", strength: 2 }).exec()
            if(catExists){
                res.redirect(catExists.url)
            }else{
                await category.save()
                res.redirect(category.url)
            }
        }
    }),
] 

exports.category_delete_get = asyncHandler(async(req,res,next)=>{
    const category = await Category.findById(req.params.id).exec()

    if(category===null){
        res.redirect("/catalog/categories")
    }
    res.render("cat_delete",{
        title:"Delete category",
        cats:category
    })
})
exports.category_delete_post= asyncHandler(async(req,res,next)=>{

     const category = await Category.findById(req.params.id).exec()

     if(!category){
        res.redirect('/catalog/categories')
        return;
     }
     await Category.findByIdAndRemove(req.params.id)
     res.redirect("/catalog/categories")
})
exports.category_update_get = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: category update GET")
})
exports.category_update_post = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: category update POST")
})