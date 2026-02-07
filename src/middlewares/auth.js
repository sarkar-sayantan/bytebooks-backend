import jwt from "jsonwebtoken";

const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_COOKIE = "session-token";

export const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1] 
    || req.cookies["authjs.session-token"];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SESSION_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
