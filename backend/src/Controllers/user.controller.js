import StatusCodes from 'http-status-codes';

import User from '../Models/user.model.js';
import EMAILSender from '../Utils/emailSender.js';
import HTTPError from '../Utils/http-error.js';
import HTTPResponse from '../Utils/http-response.js';
import PasswordGenerator from '../Utils/passwordGenerator.js';

export const signup = async (req, res, next) => {
  const { name, email } = req.body;
  let existedUser = await User.findOne({ email });
  if (existedUser) {
    return next(new HTTPError('Same User exists', StatusCodes.CONFLICT));
  }
  let password = await PasswordGenerator(8);
  await EMAILSender(email, `Your password: ${password}`);

  let user = new User({ name, email });
  await user.encryptPassword(password);
  await user.save();
  res
    .status(StatusCodes.CREATED)
    .json(new HTTPResponse(user, 'Signed up successfully'));
};

export const login = async (req, res, next) => {
  const { password, email } = req.body;
  let existedUser = await User.findOne({ email });
  if (!existedUser) {
    return next(new HTTPError('No user found', StatusCodes.NOT_FOUND));
  }
  if (await existedUser.comparePassword(password)) {
    let token = existedUser.generateAuthToken();
    let { password, ...responseUser } = existedUser._doc;
    res
      .status(StatusCodes.OK)
      .json(
        new HTTPResponse({ ...responseUser, token }, 'Logged in successfully'),
      );
  } else {
    return next(
      new HTTPError('Wrong Email/Password', StatusCodes.UNAUTHORIZED),
    );
  }
};
