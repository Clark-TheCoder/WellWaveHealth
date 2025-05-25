import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // Grab token from cookie

    if (!token) {
      return res.status(403).json({ message: "Access Denied" });
    }

    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });

    req.user = decoded; // Set user info for controller use
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticateToken;
