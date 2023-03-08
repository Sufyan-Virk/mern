
import * as yup from 'yup';

export default{ 
category(req, res, next){
    let schema = yup.object({
        name: yup.string().required('category name is required'),
    });
    
      schema.validateSync(req.body, {abortEarly: false});
      next();
     
  } }