const Item = require("../models/items")
const Category = require("../models/category")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");

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
        title:item.name,
        itemDetails:item,
    })
})
exports.item_create_get = asyncHandler(async (req, res, next) => {
    const [allItems, allCategories] = await Promise.all([
      Item.find().exec(),
      Category.find().exec(),
    ]);
    res.render("item_form", {
      title: "Create Item",
      items: allItems,
      categories: allCategories,
    });
  });
  
  exports.item_create_post = [
    (req, res, next) => {
      if (!(req.body.category instanceof Array)) {
        if (typeof req.body.category === "undefined") req.body.category = [];
        else req.body.category = new Array(req.body.category);
      }
      //req.body.category = req.body.category.map((categoryId) => new mongoose.Types.ObjectId(categoryId));
      next();
    },
  
    body("name", "Name must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("description", "Description required")
    .trim()
    .isLength({ min: 1 }),
    body("category", "Must choose at least one category").isArray({ min: 1 }),
    body("price")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Price required")
      .isCurrency({ allow_negatives: false })
      .withMessage("Price must be a positive number")
      .isCurrency({ require_decimal: false, digits_after_decimal: [0] })
      .withMessage("Price must be a whole number and not in decimals"),
    body("stock")
      .trim()
      .isInt({ min: 0 })
      .withMessage("Minimum quantity of 0")
      .isInt({ max: 100 })
      .withMessage("Maximum quantity of 100"),
  
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
  
      const item = new Item({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
      });
  
      if (!errors.isEmpty()) {
        const allCategories = await Category.find({}, "name").exec();
  
        for (const category of allCategories) {
          if (item.category.includes(category._id)) {
            category.checked = "true";
          }
        }
  
        let formattedPrice = '';
        if (item.price) formattedPrice = item.price.toString();
  
        res.render("item_form", {
          title: "Add Item",
          categories: allCategories,
          formatted_price: formattedPrice,
          item: item,
          errors: errors.array(),
        });
        return;
      } else {
        await item.save();
        res.redirect(item.url);
      }
    }),
  ];
  
exports.item_delete_get = asyncHandler(async(req,res,next)=>{
    const item = await Item.findById(req.params.id).populate("category").exec()

    if(item===null){
      res.redirect("/catalog/items")
    }
    res.render("item_delete",{
      title:"Delete item",
      items:item,
    })
})
exports.item_delete_post = asyncHandler(async(req,res,next)=>{
  const item = await Item.findById(req.params.id).populate("category").exec()
  if(item===null){
    res.render("item_delete",{
      title:"Delete item",
      item:item,
    })
    return;
  }else{
    await Item.findByIdAndRemove(req.body.itemid)
  res.redirect("/catalog/items")
  }
  
  
})


exports.item_update_get = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: Items update GET")
})
exports.item_update_post = asyncHandler(async(req,res,next)=>{
    res.send("NOT IMPLEMENTED: Items update POST")
})