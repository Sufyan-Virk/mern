import * as yup from 'yup';
import mongoose from 'mongoose';
export default{ 
car(req, res, next){
    let schema = yup.object({
        model: yup.string().required('model is required'),
        color: yup.string().required('color is requied'),
        make: yup.string().required('make is requred'),
        registrationNo: yup.string().required('registrationNo is required'),
        category: yup.string().test(
        "is-objectid",
        "category is not a valid ObjectId",
        value => mongoose.Types.ObjectId.isValid(value)).required('category is required'),
    });
      schema.validateSync(req.body, {abortEarly: false});
      next();
     
  } }