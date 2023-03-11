import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.header('token');
  if (!token) {
    res.status(401);
    throw new Error('Access denied');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.loggedinUser = decoded;
    next();
  } catch (err) {
    res.status(400).json({ status: false, message: 'User Session expired' });
  }
};
