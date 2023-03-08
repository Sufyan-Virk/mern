import express from "express";
import {catchAsyncErrors, validationCatches} from "../Middlewares/tryCatch.js";
import validation from "../Middlewares/category.validation.js";
import {createCategory, getCategories, updateCategory} from "../Controllers/category.controller.js";

const router =   express.Router();

router.route('/').get(catchAsyncErrors(getCategories)).post(
  validationCatches(validation.category), catchAsyncErrors(createCategory)
);
router.route('/:id').patch(validationCatches(validation.category), catchAsyncErrors(updateCategory))

export default router;