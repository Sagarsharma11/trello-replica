import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate users using JWT.
 * @function authMiddleware
 * @param {Object} req - The request object, containing the headers.
 * @param {Object} res - The response object, used to send back the desired HTTP response.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {Promise<void>} Calls the next middleware or returns an error response if authentication fails.
 */
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Save the decoded user info in request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export { authMiddleware };
