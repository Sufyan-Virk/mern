import * as yup from 'yup';

export default {
  user(req, res, next) {
    let schema = yup.object({
      name: yup.string().required('name is required'),
      email: yup
        .string()
        .email('enter valid email')
        .required('email is required'),
    });

    schema.validateSync(req.body, { abortEarly: false });
    next();
  },
};
