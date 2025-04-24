import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    //check if token exists
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
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

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticateToken;
