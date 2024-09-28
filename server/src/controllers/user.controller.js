import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SuccessResponse, ErrorResponse } from '../utils/apiResponse.js';

/**
 * Registers a new user.
 * @async
 * @function registerUser
 * @param {Object} req - The request object containing user registration details.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} Returns a response with a success message and a JWT token if registration is successful or an error message.
 */
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !email || !password) {
    return res.status(400).json(new ErrorResponse('Please provide all fields.', 400));
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(new ErrorResponse('User already exists.', 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json(new SuccessResponse('User registered successfully.', { token }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ErrorResponse('Server Error: Could not register user.'));
  }
};

/**
 * Logs in a user.
 * @async
 * @function loginUser
 * @param {Object} req - The request object containing user login details.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} Returns a response with a success message and a JWT token if login is successful or an error message.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json(new ErrorResponse('Please provide email and password.', 400));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(new ErrorResponse('Invalid credentials.', 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(new ErrorResponse('Invalid credentials.', 400));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json(new SuccessResponse('User logged in successfully.', { token }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ErrorResponse('Server Error: Could not log in.'));
  }
};

/**
 * Handles Google login (not implemented yet).
 * @async
 * @function googleLogin
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} Returns a response indicating that Google login is not implemented.
 */
const googleLogin = async (req, res) => {
  return res.status(501).json(new ErrorResponse('Google login not implemented yet.', 501));
};

export const userController = { registerUser, loginUser, googleLogin };
