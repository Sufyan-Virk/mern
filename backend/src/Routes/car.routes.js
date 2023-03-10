import express from 'express';
import {
  catchAsyncErrors,
  validationCatches,
} from '../Middlewares/tryCatch.js';
import validation from '../Utils/validations/car.validation.js';
import {
  createCar,
  updateCar,
  getCars,
  deleteCar,
} from '../Controllers/car.controller.js';

const router = express.Router();

router
  .route('/')
  .get(catchAsyncErrors(getCars))
  .post(validationCatches(validation.car), catchAsyncErrors(createCar));
router
  .route('/:id')
  .patch(validationCatches(validation.car), catchAsyncErrors(updateCar))
  .delete(catchAsyncErrors(deleteCar));

export default router;
