import Category from "../Models/category.model.js";
import HTTPError from'../Utils/http-error.js';
import HTTPResponse from "../Utils/http-response.js";
import StatusCodes from "http-status-codes";

 export const createCategory = async (req, res, next) => {
  const {name} = req.body;
  const insertedCategory = await Category.findOne({name: name});
  if(insertedCategory){
    return next(new HTTPError('Same category exists', StatusCodes.CONFLICT))
  }
  const category = new Category({name});
   await category.save();
  res.status(StatusCodes.CREATED).json(new HTTPResponse(category, 'Category added successfully'))
   
};

export const getCategories = async (req, res, next) => {
    let allCategories = await Category.find({}).lean();
  res.send(new HTTPResponse(allCategories));
};

export const updateCategory = async (req, res, next) => {
  let updatedCategory = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true}).lean();
  res.status(StatusCodes.ACCEPTED).send(new HTTPResponse(updatedCategory, 'Category updated successfully'));
};

