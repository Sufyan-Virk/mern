import * as yup from 'yup';

export default {
  category(req, res, next) {
    const schema = yup.object({
      name: yup.string().required('category name is required'),
    });

    schema.validateSync(req.body, { abortEarly: false });
    next();
  },
};
