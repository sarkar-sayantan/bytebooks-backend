import jwt from "jsonwebtoken";

const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_COOKIE = "session-token";

export const authMiddleware = (req, res, next) => {
	const token = req.cookies?.[SESSION_COOKIE] || req.headers["authorization"]?.replace("Bearer ", "");

	if (!token) {
		return res.status(401).json({ error: "Authentication required" });
	}

	try {
		const user = jwt.verify(token, SESSION_SECRET);
		req.user = user;
		next();
	} catch (err) {
		return res.status(401).json({ error: "Invalid or expired session" });
	}
};
