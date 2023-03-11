import express from 'express';
import {
  catchAsyncErrors,
  validationCatches,
} from '../Middlewares/tryCatch.js';
import { signup, login } from '../Controllers/user.controller.js';
import validation from '../Utils/validations/user.validation.js';

const router = express.Router();

router.post(
  '/signup',
  validationCatches(validation.user),
  catchAsyncErrors(signup),
);
router.post('/login', catchAsyncErrors(login));

export default router;
