import User from '../models/user_model.js';
import bcryptjs from 'bcryptjs'; //used to encrypt tha password
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword});
    await newUser.save();

    // ✅ Success response
    res.status(201).json("User created successfully!");
  } catch (error) {
    // ⚠️ Handle duplicate key error (e.g., username or email already exists)
    if (error.code === 11000) {
      return res.status(400).json("Username or email already exists.");
    }

    // ❌ Handle other server errors
    // console.error(error);
    // res.status(500).json("Something went wrong.");
    next(error);
  }
};
