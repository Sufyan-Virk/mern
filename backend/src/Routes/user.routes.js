import express from "express";
import {catchAsyncErrors } from "../Middlewares/tryCatch.js";
import {signup, login} from "../Controllers/user.controller.js";

const router =   express.Router();

router.post('/signup', catchAsyncErrors(signup));
router.post('/login', catchAsyncErrors(login))

export default router;