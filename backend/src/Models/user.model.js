import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { versionKey: false },
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
  return token;
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.encryptPassword = async function (data, saltRounds = 10) {
  let hashedData = await new Promise((resolve, reject) => {
    bcrypt.hash(data, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  this.password = hashedData;
};

const user = model('User', userSchema);
export default user;
