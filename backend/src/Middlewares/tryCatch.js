

 import HTTPError from "../Utils/http-error.js";
 import StatusCodes from "http-status-codes";

  
 export const catchAsyncErrors = (action = RequiredParam('action')) => (req, res, next) => action(req, res, next).catch((err)=>  next(err))

  export const validationCatches = (validation = RequiredParam('validation')) => (req, res, next) => { try {
    validation(req, res, next)
  } catch (error) {
    let validationError; 
    if(error.errors.length ==1) {
       validationError = new HTTPError(error.errors[0], StatusCodes.BAD_REQUEST);
    }
    else{
    validationError = new HTTPError('validation error', StatusCodes.BAD_REQUEST, error.errors);
    }
    return next(validationError)
  } 
}